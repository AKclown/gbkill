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

// 默认合并主分支
export const DEFAULT_MERGED_BRANCH = 'main'

// TODO: 最低版本限制 （后续测试到最低12.0.0版本）
export const LOWEST_NODE_VERSION = '18.20.0';

// 脚手架存储的文件
export const DEFAULT_CLI_HOME = '.gbkill';
