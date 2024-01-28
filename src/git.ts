import { BranchSingleDeleteSuccess, simpleGit, SimpleGit } from 'simple-git'
import { BRANCH_STATUS, DEFAULT_MERGED_BRANCH } from './constants.js';
import task from './task.js';
import eventBus, { EVENT_TYPE } from './eventBus.js';
import { IWriteFile } from './actions.js';

export interface GitOption extends Pick<IWriteFile, 'lock' | 'merged'> {
    force: boolean;
    sync: boolean;
}

export interface IBranchDeleteResult {
    branch: string;
    status: BRANCH_STATUS;
    // 错误信息
    message?: string;
}

class Git {
    private simpleGit: SimpleGit;
    public gitOptions: GitOption;

    constructor() {
        this.simpleGit = simpleGit();
        this.gitOptions = {
            force: false,
            sync: false,
            lock: [],
            merged: DEFAULT_MERGED_BRANCH
        }
    }

    async deleteRemoteBranch(branchName: string) {
        // git push origin --delete branch
        await this.simpleGit.push('origin', branchName, ['--delete'])
    }

    async deleteLocalBranch(taskId: string, branchName: string) {
        let branchResult: IBranchDeleteResult = {
            branch: branchName,
            status: BRANCH_STATUS.DELETING,
            message: undefined,
        }
        try {
            if (this.gitOptions.sync) {
                // 同步删除远程分支
                await this.deleteRemoteBranch(branchName)
            }
            const result = await this.simpleGit.deleteLocalBranch(branchName, this.gitOptions.force)
            if (result.success) {
                branchResult.status = BRANCH_STATUS.DELETED
            } else {
                branchResult.status = BRANCH_STATUS.FAILED
            }
        } catch (error: any) {
            const message = error.message.replace(/[\n|\r|\r\n]/g, ',')
            if (~message.indexOf('git branch -D')) {
                // 需要强制才可以删除
                branchResult.status = BRANCH_STATUS.NO_FORCE
            } else if (~message.indexOf('failed to push some refs')
                || ~message.indexOf('Could not read from remote repository')) {
                // 删除远程分支出错
                branchResult.status = BRANCH_STATUS.NO_SYNC
            } else {
                // 未知失败
                branchResult.status = BRANCH_STATUS.FAILED
            }
            branchResult.message = message
        }
        task.deleteError(branchName);

        if (branchResult.status !== BRANCH_STATUS.DELETED) {
            task.addError(branchName)
            eventBus.emit(EVENT_TYPE.ERROR, task.getErrors())
        }
        const callback = task.getTaskById(taskId);
        callback!(branchResult)
        task.deleteTaskById(taskId);
    }

    async getMergedBranches(): Promise<Array<string>> {
        const mergedBranch = this.gitOptions.merged || DEFAULT_MERGED_BRANCH;
        try {
            const branchResult = await this.simpleGit.branch(['--merged', mergedBranch]);
            return branchResult.all;
        } catch (error: any) {
            if (~error.message.indexOf('malformed object name')) {
                throw new Error(`--merged指定的${mergedBranch}分支不存在`)
            } else {
                throw new Error(error.message)
            }

        }

    }

    async getLocalBranches() {
        // TODO: 子模块也需要同步获取到
        const lock = new Set(this.gitOptions.lock);
        const branchResult = await this.simpleGit.branchLocal();
        const mergedBranches = await this.getMergedBranches();
        const branches = Object.values(branchResult.branches)
            .filter(branch => !lock.has(branch.name))
            .map(branch => ({
                name: branch.name,
                value: branch.label,
                merged: mergedBranches.includes(branch.name),
                status: BRANCH_STATUS.NONE
            }))
        return branches
    }
}

export default Git;