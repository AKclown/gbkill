import React from 'react';
import { Box, Text } from 'ink';
import pkg from '../../package.json' assert { type: "json" };

interface IExit {
    code: number;
}

const Exit: React.FC<IExit> = (props) => {
    return (
        <Box>
            {
                props.code ?
                    <Text color='#EA3323'>🤡 Go to the project to fix issue! 🤡</Text>
                    :
                    <Text color='#919191'>🤡 Thanks for using {pkg.name}! 🤡</Text>
            }
        </Box>
    )
};

export default Exit
