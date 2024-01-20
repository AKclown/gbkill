import Git from './git.js';
import UI from './ui/index.js'
class Actions {

    private git: Git;
    private ui: UI;

    constructor() {
        this.git = new Git();
        this.ui = new UI()
    }

    async deleteGitBranch(args: any[]) {
        const branches = await this.git.getLocalBranches()
        this.ui.render(branches);
    }
}

export default Actions
