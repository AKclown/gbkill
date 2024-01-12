import Git from './git';
import './ui'
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
