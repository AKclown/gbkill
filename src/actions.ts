import path from 'path';
import fs from 'fs';
import Git, { GitOption } from './git.js';
import UI from './ui/index.js'
import { DEFAULT_CLI_HOME, userHome } from './constants.js';
class Actions {

    private git: Git;
    private ui: UI;

    constructor() {
        this.git = new Git();
        this.ui = new UI(this.git)
    }

    readEnvFile() {
        const home = userHome()
        const filePath = path.join(home, DEFAULT_CLI_HOME);
        if (fs.existsSync(filePath)) {

        }
    }

    writeEnvFile() {
        const home = userHome()
        const filePath = path.join(home, DEFAULT_CLI_HOME);

    }


    async gbkill(args: Record<string, unknown>) {
        console.log('args: ', args);
        const { force = false, sync = false } = args
        this.git.gitOptions = {
            force,
            sync
        } as GitOption
        const branches = await this.git.getLocalBranches()
        this.ui.render(branches);
    }

    async exit(code: number) {
        this.ui.renderExit(code);
    }
}

export default Actions
