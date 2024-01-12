import { simpleGit, SimpleGit } from 'simple-git'
class Git {

    private simpleGit: SimpleGit

    constructor() {
        this.simpleGit = simpleGit();
    }

    async getLocalBranches() {
        // 子模块也需要同步获取到
        const branchResult = await this.simpleGit.branchLocal();
        const branches = Object.values(branchResult.branches).map(branch => ({
            name: branch.name,
            value: branch.label
        }))

        return branches
    }
}

export default Git;