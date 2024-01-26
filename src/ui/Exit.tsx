import React from 'react';
import { Box, Text } from 'ink';
import pkg from '../../package.json' assert { type: "json" };

interface IExit {
    code: number;
}

const Exit: React.FC<IExit> = (props) => {
    return (
        <Box paddingTop={1}>
            {
                props.code ?
                    <Text color='#EA3323'>🤡 Go to the project to fix issue! 🤡</Text>
                    :
                    <Text>🤡 Thanks for using {pkg.name}! 🤡</Text>
            }
        </Box>
    )
};

export default Exit
