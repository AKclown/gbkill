import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Key, Text, measureElement, useInput } from 'ink';
import useHighlightLine from './HighlightLine.js';
import userInput from './userInput.js'

interface IList {
    branches: Array<any>;
}

const List: React.FC<IList> = (props) => {

    const highlight = 0

    // *********************
    // Hooks Function
    // *********************

    const screen = useRef(null)
    const paintBgRow = useHighlightLine()
    const [columns, setColumns] = useState(0)
    const [row, setRow] = useState(13)

    userInput()
    // *********************
    // Life Cycle Function
    // *********************

    // TODO 暂时不知道如何绘制背景线条
    // paintBgRow(row, 100)

    useEffect(() => {
        //     const { width } = measureElement(screen.current!);
        //     setColumns(width)


    }, []);

    // *********************
    // Service Function
    // *********************


    // *********************
    // View
    // *********************

    return (
        <Box flexDirection="column" ref={screen}>
            {
                props.branches.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Box width='30%'>
                                <Text wrap="truncate-end" color={index === highlight ? 'blue' : 'gray'} >{item.name}</Text>
                            </Box>
                            <Box flexGrow={1}>
                                <Text wrap="truncate-end" color={index === highlight ? 'blue' : 'gray'} >{item.value}</Text>
                            </Box>
                            <Text color={index === highlight ? 'blue' : 'gray'} >No</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
};

export default List
