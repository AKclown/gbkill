import path from 'path';

// 分支状态
export enum BRANCH_STATUS {
  NONE,
  DELETING,
  DELETED,
  FAILED,
  NO_MERGED,
  NO_FORCE,
  NO_SYNC,
}

// 分支状态文案
export const BRANCH_STATUS_TEXT = {
  [BRANCH_STATUS.NONE]: '',
  [BRANCH_STATUS.DELETING]: '',
  [BRANCH_STATUS.DELETED]: 'DELETE',
  [BRANCH_STATUS.FAILED]: 'FAILED',
  [BRANCH_STATUS.NO_MERGED]: 'NO_MERGED',
  [BRANCH_STATUS.NO_FORCE]: 'NO_FORCE',
  [BRANCH_STATUS.NO_SYNC]: 'NO_SYNC',
};

// 错误类型
export enum ERROR_TYPE {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
}

// 默认合并主分支
export const DEFAULT_MERGED_BRANCH = 'main';

// 默认语言
export const DEFAULT_LANGUAGE = 'EN';

// 最低版本限制
export const LOWEST_NODE_VERSION = '16.20.0';

// 脚手架存储的文件
export const DEFAULT_CLI_HOME = '.gbkill';

export function userHome(...args: any[]) {
  const home =
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  if (!home) {
    throw new Error(
      `[${ERROR_TYPE.USER}]Could not find a valid user home path.`
    );
  }
  return path.resolve.apply(
    path.resolve,
    [home].concat(Array.prototype.slice.call(args, 0))
  );
}
