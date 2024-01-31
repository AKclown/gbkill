import path from 'path';
import fs from 'fs';
import Git, { GitOption } from './git.js';
import UI from './ui/index.js'
import { DEFAULT_CLI_HOME, DEFAULT_LANGUAGE, DEFAULT_MERGED_BRANCH, userHome } from './constants.js';

export enum Language {
    EN,
    ZH
}

export interface IWriteFile {
    lock: Array<string>;
    unlock: Array<string>;
    language?: Language;
    merged?: string;
}

interface IEnv {
    MERGED_BRANCH: string;
    LOCK: Array<string>;
    LANGUAGE: Language;
}

class Actions {

    private git: Git;
    private ui: UI;

    constructor() {
        this.git = new Git();
        this.ui = new UI(this.git)
    }

    readEnvFile(): IEnv {
        const home = userHome()
        const filePath = path.join(home, DEFAULT_CLI_HOME);
        let env: IEnv = {
            MERGED_BRANCH: DEFAULT_MERGED_BRANCH,
            LOCK: [],
            LANGUAGE: DEFAULT_LANGUAGE as unknown as Language,
        };
        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath);
            env = JSON.parse(file.toString())
        } else {
            fs.writeFileSync(filePath, JSON.stringify(env))
        }
        return env
    }

    writeEnvFile(options: IWriteFile): IEnv {
        const home = userHome()
        const filePath = path.join(home, DEFAULT_CLI_HOME);
        const cacheEnv = this.readEnvFile();
        let lock = cacheEnv.LOCK.concat(options.lock);
        const unlock = new Set(options.unlock);
        if (unlock.size) {
            // 去掉解锁的分支
            lock = lock.filter(name => !unlock.has(name))
        }
        const env: IEnv = {
            MERGED_BRANCH: options.merged ?? cacheEnv.MERGED_BRANCH,
            LOCK: lock,
            LANGUAGE: options.language ?? cacheEnv.LANGUAGE,
        }
        fs.writeFileSync(filePath, JSON.stringify(env))
        return env
    }


    async gbkill(args: Record<string, unknown>) {
        const {
            force = false,
            sync = false,
            // submodule = false,
            lock = [],
            unlock = [],
            language,
            merged
        } = args;

        const env = this.writeEnvFile({ lock, unlock, language, merged } as IWriteFile)

        this.git.gitOptions = {
            force,
            sync,
            lock: env.LOCK,
            merged: env.MERGED_BRANCH
        } as GitOption
        const branches = await this.git.getLocalBranches()
        this.ui.render(branches, env.MERGED_BRANCH);
    }

    async exit(code: number) {
        this.ui.renderExit(code);
    }
}

export default Actions
