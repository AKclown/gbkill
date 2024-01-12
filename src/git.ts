import { simpleGit, SimpleGit } from 'simple-git'
class Git {

    private simpleGit: SimpleGit

    constructor() {
        this.simpleGit = simpleGit();
    }

    async getLocalBranches() {
        // 子模块也需要同步获取到
        const cwd = process.cwd();
        const branches = await this.simpleGit.branchLocal();
        console.log('branches: ', branches);
        console.log('cwd: ', cwd);
    }
}

export default Git;