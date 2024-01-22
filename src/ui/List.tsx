import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Key, Text, measureElement, useInput } from 'ink';
import useHighlightLine from './HighlightLine.js';
import userInput from './userInput.js'

interface IList {
    branches: Array<any>;
    onEventTrigger: (branches: Array<any>) => void;
}

const List: React.FC<IList> = (props) => {

    // *********************
    // Hooks Function
    // *********************

    const screen = useRef(null)
    const paintBgRow = useHighlightLine()
    const [columns, setColumns] = useState(0)
    const [row, setRow] = useState(13)
    const { range } = userInput(props.branches.length)

    // *********************
    // Life Cycle Function
    // *********************

    useEffect(() => {
        //     const { width } = measureElement(screen.current!);
        //     setColumns(width)


    }, []);

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

    // *********************
    // View
    // *********************
    // TODO 整行背景高亮，暂时不支持等其支持在处理
    //  https://github.com/vadimdemedes/ink/issues/598

    return (
        <Box flexDirection="column" ref={screen}>
            {
                props.branches.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Box width='30%'>
                                <Text wrap="truncate-end" {...highlight(index)} >{item.name}</Text>
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
