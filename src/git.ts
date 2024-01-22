import { simpleGit, SimpleGit } from 'simple-git'
import { BRANCH_STATUS } from './constants.js';
import taskQueue from './taskQueue.js';
class Git {
    private DEFAULT_MERGED_BRANCH = 'main';

    private simpleGit: SimpleGit;

    constructor() {
        this.simpleGit = simpleGit();
    }

    async deleteLocalBranch(taskId: string, branchName: string) {
        let branchResult = await this.simpleGit.deleteLocalBranch(branchName)
        const callback = taskQueue.getQueueById(taskId);
        callback!(branchResult)
        taskQueue.deleteQueueById(taskId);
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
            merged: mergedBranches.includes(branch.name),
            status: BRANCH_STATUS.NONE
        }))
        return branches
    }
}

export default Git;