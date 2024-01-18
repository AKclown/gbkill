import Git from './git.js';
import './ui.js'
class Actions {

    private git: Git;

    constructor() {
        this.git = new Git();
    }


    async deleteGitBranch(args: any[]) {
        const branches = await this.git.getLocalBranches()

    }
}

export default Actions
