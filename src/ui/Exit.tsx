import React from 'react';
import { Box, Text } from 'ink';
import Link from 'ink-link';
import pkg from '../../package.json' assert { type: "json" };

interface IExit {
    code: number;
}

const Exit: React.FC<IExit> = (props) => {
    return (
        <Box paddingTop={1}>
            {
                props.code ? <Box>
                    <Link url="https://github.com/AKclown/gbkill/issues">
                        <Text>🤡 Go to the project to raise issue! 🤡</Text>
                    </Link>
                </Box> :
                    <Box>
                        <Link url="https://github.com/AKclown/gbkill">
                            <Text>🤡 Thanks for using {pkg.name}! Give suggestions for improvement 🤡</Text>
                        </Link>
                    </Box>
            }
        </Box>
    )
};

export default Exit
