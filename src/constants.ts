// 分支状态
export enum BRANCH_STATUS {
    NONE = 'None',
    DELETING = 'Deleting',
    DELETED = 'Deleted',
    FAILED = 'Failed',
    NO_MERGED = 'NoMerged',
    NO_FORCE = "NoForce"
}

// 分支状态文案
export const BRANCH_STATUS_TEXT = {
    [BRANCH_STATUS.NONE]: '',
    [BRANCH_STATUS.DELETING]: '',
    [BRANCH_STATUS.DELETED]: 'Deleted',
    [BRANCH_STATUS.FAILED]: 'Failed',
    [BRANCH_STATUS.NO_MERGED]: 'NoMerged',
    [BRANCH_STATUS.NO_FORCE]: 'NoForce',
}
