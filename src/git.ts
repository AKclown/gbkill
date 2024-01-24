import { BranchSingleDeleteFailure, BranchSingleDeleteResult, BranchSingleDeleteSuccess, simpleGit, SimpleGit } from 'simple-git'
import { BRANCH_STATUS } from './constants.js';
import task from './task.js';

export interface GitOption {
    force: boolean;
    sync: boolean;
}

export interface IBranchDeleteResult extends Omit<BranchSingleDeleteSuccess, 'hash' | 'success'> {
    hash: null | string;
    success: boolean;
    force: boolean;
}

class Git {
    private simpleGit: SimpleGit;
    public gitOptions: GitOption;
    private DEFAULT_MERGED_BRANCH: string = 'main';

    constructor() {
        this.simpleGit = simpleGit();
        this.gitOptions = {
            force: false,
            sync: false,
        }
    }

    async deleteLocalBranch(taskId: string, branchName: string) {
        let branchResult: IBranchDeleteResult = {
            branch: branchName,
            hash: null,
            success: false,
            force: false
        }
        try {
            // const result = await this.simpleGit.deleteLocalBranch(branchName, this.gitOptions.force)
            // branchResult = { ...branchResult, ...result };
        } catch (error: any) {
            if (~error.message.indexOf('git branch -D')) {
                // 需要强制才可以删除
                branchResult = { ...branchResult, force: true }
            }
        }
        task.deleteError(branchName);

        if (!branchResult.success) {
            task.addError(branchName)
        }
        const callback = task.getTaskById(taskId);
        callback!(branchResult)
        task.deleteTaskById(taskId);
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