import React, { useState, useEffect, useMemo } from 'react';
import { Box, Text } from 'ink';
import userInput, { IRange } from './hooks/userInput.js'
import { BRANCH_STATUS, BRANCH_STATUS_TEXT } from '../constants.js';
import task from '../task.js';
import Spinner from 'ink-spinner';
import ScrollArea from './ScrollArea.js';
import useStdoutDimensions from './hooks/useStdoutDimensions.js';
import { IBranchDeleteResult } from '../git.js';

export enum Actions {
    SPACE = 'space',
    TAB = 'tab',
}
interface IList {
    branches: Array<any>;
    onEventTrigger: (taskId: string, branchName: string) => void;
}

const List: React.FC<IList> = (props) => {

    const [branches, setBranches] = useState(props.branches);

    // *********************
    // Default Function
    // *********************

    const deleteBranch = (range: IRange, action: Actions) => {
        // 并发执行
        // TODO: 写一个深度方法copy一下
        const cloneBranches = JSON.parse(JSON.stringify(branches))
        for (let i = range.start; i <= range.end; i++) {
            const branch = cloneBranches[i];
            const merged = action === Actions.TAB ? true : branch.merged;
            const canDelete = ![BRANCH_STATUS.DELETED, BRANCH_STATUS.DELETING].includes(branch.status)
            if (merged && canDelete) {
                // 分支被合并了，以及状态不是'正在删除'|'删除成功'
                cloneBranches[i].status = BRANCH_STATUS.DELETING;
                task.createTask<IBranchDeleteResult>((taskId) => {
                    props.onEventTrigger(taskId, branch.name)
                }).then(res => {
                    const copyBranches = JSON.parse(JSON.stringify(branches))
                    if (res.force) {
                        copyBranches[i].status = BRANCH_STATUS.NO_FORCE;
                    }else if (res.success) {
                        copyBranches[i].status = BRANCH_STATUS.DELETED;
                    } else {
                        copyBranches[i].status = BRANCH_STATUS.FAILED;
                    }
                    setBranches(copyBranches)
                })
            } else if (!merged && canDelete) {
                cloneBranches[i].status = BRANCH_STATUS.NO_MERGED;
            }
        }
        setBranches(cloneBranches)
    }

    // 空格触发事件
    const onSpace = (range: IRange) => {
        deleteBranch(range, Actions.SPACE);
    }

    // tan触发事件
    const onTab = (range: IRange) => {
        deleteBranch(range, Actions.TAB);
    }

    // *********************
    // Hooks Function
    // *********************
    const [columns, rows] = useStdoutDimensions();
    const { range, activeIndex } = userInput(branches.length, { onSpace, onTab })
    const [scrollHeight, setScrollHeight] = useState(0)

    // *********************
    // Life Cycle Function
    // *********************

    useEffect(() => {
        // !!! 减去 数值 9，这个9是列表前面的行数. 解决选择时闪动问题，内容不能超过整体屏幕高度
        const height = props.branches.length > rows - 9 ? rows - 9 : props.branches.length
        setScrollHeight(height)
    }, [rows, props.branches.length])

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
            case BRANCH_STATUS.DELETED:
                return '#00D26A'
            case BRANCH_STATUS.NO_MERGED:
                return '#8661B6'
            case BRANCH_STATUS.NO_FORCE:
                return '#E5E510'
            case BRANCH_STATUS.FAILED:
                return '#F8312F'
            default:
                return ''
        }
    }

    const lockScrollDown = useMemo(() => {
        // $ 当滚动大于需要展示的内容列表，锁定scroll down不需要在往下滚动
        return scrollHeight >= props.branches.length - activeIndex
    }, [props.branches.length, activeIndex, scrollHeight])

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
            <ScrollArea height={scrollHeight} lockScrollDown={lockScrollDown}>
                {
                    branches.map((item, index) => {
                        return (
                            <Box key={item.name}>
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
            </ScrollArea>
        </Box>
    )
};

export default List
