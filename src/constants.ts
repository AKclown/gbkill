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
    [BRANCH_STATUS.DELETED]: 'DELETE',
    [BRANCH_STATUS.FAILED]: 'FAILED',
    [BRANCH_STATUS.NO_MERGED]: 'NO_MERGED',
    [BRANCH_STATUS.NO_FORCE]: 'NO_FORCE',
}
