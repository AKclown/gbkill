import { simpleGit, SimpleGit } from 'simple-git'
class Git {
    private DEFAULT_MERGED_BRANCH = 'main';

    private simpleGit: SimpleGit;

    constructor() {
        this.simpleGit = simpleGit();
    }

    async deleteLocalBranches(names: Array<string>) {

    }

    async getMergedBranches(): Promise<Array<string>> {
        const mergedBranch = this.DEFAULT_MERGED_BRANCH;
        const branchResult = await this.simpleGit.branch(['--merged', mergedBranch]);
        return branchResult.all;
    }

    async getLocalBranches() {
        // 子模块也需要同步获取到
        const branchResult = await this.simpleGit.branchLocal();
        const mergedBranches = await this.getMergedBranches();
        const branches = Object.values(branchResult.branches).map(branch => ({
            name: branch.name,
            value: branch.label,
            merged: mergedBranches.includes(branch.name)
        }))
        return branches
    }
}

export default Git;