import React from 'react';
import { Box, Text, Newline, Spacer } from 'ink';

interface IList {
    branches: Array<any>;
}

const List: React.FC<IList> = (props) => {

    const highlight = 0

    const getStyle = (index: number) => {
        return highlight === index ? {
            backgroundColor: '#2167B5',
            color: '#fff'
        } : {}
    }

    return (
        <Box flexDirection="column">
            {
                props.branches.map((item, index) => {
                    return (
                        <Box key={index}>
                            <Box width='30%'>
                                <Text {...getStyle(index)} >{item.name}</Text>
                            </Box>
                            <Box flexGrow={1}>
                                <Text wrap="truncate-end" {...getStyle(index)}>{item.value}</Text>
                            </Box>
                            <Text {...getStyle(index)}>No</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
};

export default List
