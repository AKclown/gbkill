import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Text } from 'ink';
import userInput, { IRange } from './userInput.js'
import { BRANCH_STATUS, BRANCH_STATUS_TEXT } from '../constants.js';
import taskQueue from '../taskQueue.js';
import Spinner from 'ink-spinner';
import { BranchSingleDeleteSuccess } from 'simple-git';

interface IList {
    branches: Array<any>;
    onEventTrigger: (taskId: string, branchName: string) => void;
}


const List: React.FC<IList> = (props) => {

    const [branches, setBranches] = useState(props.branches);

    // *********************
    // Default Function
    // *********************

    // 空格触发事件
    const onSpace = (range: IRange) => {
        // 并发执行
        // TODO: 写一个深度方法copy一下
        const cloneBranches = JSON.parse(JSON.stringify(branches))
        for (let i = range.start; i <= range.end; i++) {
            const branch = cloneBranches[i];
            if (branch.merged && ![BRANCH_STATUS.DELETED, BRANCH_STATUS.DELETING].includes(branch.status)) {
                // 分支被合并了，以及状态不是'正在删除'|'删除成功'
                cloneBranches[i].status = BRANCH_STATUS.DELETING;
                taskQueue.request<BranchSingleDeleteSuccess>((taskId) => {
                    props.onEventTrigger(taskId, branch.name)
                }).then(res => {
                    const copyBranches = JSON.parse(JSON.stringify(branches))
                    if (res.success) {
                        copyBranches[i].status = BRANCH_STATUS.DELETED;
                    } else {
                        copyBranches[i].status = BRANCH_STATUS.FAILED;
                    }
                    setBranches(copyBranches)
                })
            } else if (!branch.merged) {
                cloneBranches[i].status = BRANCH_STATUS.NO_MERGED;
            }
        }
        setBranches(cloneBranches)
    }

    // tan触发事件
    const onTab = (range: IRange) => {

    }

    // *********************
    // Hooks Function
    // *********************

    const { range } = userInput(branches.length, { onSpace, onTab })

    // *********************
    // Life Cycle Function
    // *********************

    // *********************
    // Service Function
    // *********************

    const highlight = (index: number) => {
        if (index >= range.start && index <= range.end) {
            return {
                color: 'blue'
            }
        } else {
            return {
                color: 'gray'
            }
        }
    }

    const statusColor = (status: BRANCH_STATUS) => {
        switch (status) {
            case BRANCH_STATUS.NO_MERGED:
                return '#FD999A'
            case BRANCH_STATUS.DELETED:
                return 'green'
            case BRANCH_STATUS.FAILED:
                return 'red'
            default:
                return ''
        }
    }

    // *********************
    // View
    // *********************

    const renderStatus = (item: any) => {
        if (item.status === BRANCH_STATUS.NONE) {
            return null;
        } else if (item.status === BRANCH_STATUS.DELETING) {
            return (
                <Text>
                    <Spinner type="earth" />
                </Text>
            )
        }
        return (
            <Text color={statusColor(item.status)}>
                {`[${BRANCH_STATUS_TEXT[item.status as BRANCH_STATUS]}] `}
            </Text>
        )
    }

    // TODO 整行背景高亮，暂时不支持等其支持在处理
    //  https://github.com/vadimdemedes/ink/issues/598

    return (
        <Box flexDirection="column" >
            {
                branches.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Box width='30%'>
                                <Text wrap="truncate-end" {...highlight(index)} >
                                    {renderStatus(item)}{item.name}
                                </Text>
                            </Box>
                            <Box flexGrow={1}>
                                <Text wrap="truncate-end" {...highlight(index)} >{item.value}</Text>
                            </Box>
                            <Text {...highlight(index)} >{item.merged ? 'yes' : 'No'}</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
};

export default List
