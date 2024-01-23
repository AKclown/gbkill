
import { Command } from 'commander';
import colors from 'colors';
import pkg from '../package.json' assert { type: "json" };
import Actions from './actions.js';

class Main {

    private program: Command;
    private actions?: Actions;

    constructor() {
        this.program = new Command()
    }

    init() {
        let chain = Promise.resolve();
        chain = chain.then(() => this.prepare())
        chain = chain.then(() => { this.actions = new Actions() })
        chain = chain.then(() => this.registerCommand())
        chain = chain.then(() => this.exitListener())
    }

    prepare() {
        /**
         * TODO：前期准备
         * 1. cli版本
         * 2. Node版本
         * 3. 降级root账户
         * 4. 检查用户主目录
         */
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