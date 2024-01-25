
import { Command } from 'commander';
import colors from 'colors';
import semver from 'semver';
import fs from 'fs';
import pkg from '../package.json' assert { type: "json" };
import Actions from './actions.js';
import { LOWEST_NODE_VERSION } from './constants.js';
import path from 'path';

class Main {

    private program: Command;
    private actions?: Actions;

    constructor() {
        this.program = new Command()
    }

    init() {
        let chain = Promise.resolve();
        chain = chain.then(async () => await this.prepare())
        chain = chain.then(() => { this.actions = new Actions() })
        chain = chain.then(() => this.registerCommand())
        chain = chain.then(() => this.exitListener())
        chain.catch(error => {
            console.log(`🤡 ${error.message} 🤡`);
        })
    }

    async prepare() {
        /**
         * TODO：前期准备
         * 1. Node版本
         * 2. 降级root账户
         * 3. 检查用户主目录
         * 4. cli版本
         */
        this.checkNodeVersion();
        this.checkRoot();
        this.checkUserHome();
        await this.checkGlobalUpdate();
    }

    checkNodeVersion() {
        // 拿到当前Node版本号
        const currentVersion = process.version;
        // 对比最低版本号
        const lowestVersion = LOWEST_NODE_VERSION;
        if (!semver.gte(currentVersion, lowestVersion)) {
            throw new Error(
                colors.red(`${pkg.name} Need to install NodeJS version ${lowestVersion} or above`)
            )
        }
    }

    checkRoot() {
        const rootCheck = require('root-check');
        // $ 尝试降级具有root权限的进程的权限，如果失败，则阻止访问权限
        rootCheck();
    }

    checkUserHome() {
        const userHome = this.userHome()
        if (!(userHome && fs.existsSync(userHome))) {
            throw new Error(colors.red(`The home directory for the current logged-in user does not exist`));
        }
    }

    userHome() {
        var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
        if (!home) {
            throw new Error('Could not find a valid user home path.');
        }
        return path.resolve.apply(path.resolve, [home]
            .concat(Array.prototype.slice.call(arguments, 0)));
    }

   async checkGlobalUpdate() {
        // 1. 获取当前版本号和模块名
        const currentVersion = pkg.version;
        const npmName = pkg.name;
        // 2. 调用NPM API 获取所有版本号
        // const lastVersion = await getNpmSemverVersion(currentVersion, npmName);
        // // 3. 提取所有版本号，对比那些版本号是大于当前版本
        // // 4. 获取最新的版本号，提示用户更新到该版本
        // if (lastVersion && semver.gt(lastVersion, currentVersion)) {
          
        // }
    }

    registerCommand() {
        this.program
            .name(pkg.name)
            .version(pkg.version)
            .description(pkg.description)
            .option('-m, --merged', '指定合并分支')
            .option('-f, --force', '是否强制删除分支')
            .option('-s, --sync', '是否同时删除远程分支')
            .action((args) => this.actions!.gbkill(args))

        // $ 监听未知命令
        this.program.on('command:*', (obj) => {
            console.error(colors.red(`${pkg.name}: 未知命令${obj[0]}`));
            const availableCommands = this.program.commands.map(cmd => cmd.name());
            if (availableCommands.length > 0) {
                console.log(colors.green(`可用命令: ${availableCommands.join(',')}`));
            }
        });
        this.program.parse(process.argv);
    }

    exitListener() {
        process.on('beforeExit', (code) => {
            this.actions!.exit(code)
            process.exit(code)
        })
    }

}

const main = new Main()

export default (): void => main.init()