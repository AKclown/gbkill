import Git from './git';

class Actions {

    private git: Git;

    constructor() {
        this.git = new Git();
    }


    deleteGitBranch(args: any[]) {
        const branches = this.git.getLocalBranches()
    }
}

export default Actions
