
import { Command } from 'commander';
import figlet from "figlet";
import colors from 'colors';
// import pkg from '../package.json';
import Actions from './actions.js';

class Main {

    private program: Command;
    private actions?: Actions;

    constructor() {
        this.program = new Command()
    }

    init() {
        let chain = Promise.resolve();
        chain = chain.then(() => this.printLogo())
        chain = chain.then(() => { this.actions = new Actions() })
        chain = chain.then(() => this.registerCommand())
    }

    printLogo() {
        console.log(colors.green(figlet.textSync("GB Kill")))
    }

    registerCommand() {
        this.program
            .name('ak')
            .version('ak')
            .description('ak')
            .option('-r, --remote', '是否同时删除远程分支')
            .action((args) => this.actions!.deleteGitBranch(args))

        // $ 监听未知命令
        this.program.on('command:*', (obj) => {
            console.error(colors.red(`ak: 未知命令${obj[0]}`));
            const availableCommands = this.program.commands.map(cmd => cmd.name());
            if (availableCommands.length > 0) {
                console.log(colors.green(`可用命令: ${availableCommands.join(',')}`));
            }
        });
        this.program.parse(process.argv);
    }
}

const main = new Main()

export default (): void => main.init()