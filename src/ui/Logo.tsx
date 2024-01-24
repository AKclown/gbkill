import React from 'react';
import { Box, Text, Newline } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import pkg from '../../package.json' assert { type: "json" };

interface ILogo {
    branchNumber: number;
}

const Logo: React.FC<ILogo> = (props) => {
    // const colors = ['#9999FE', '#FD999A']
    return (
        <Box alignItems="flex-end">
            <Box>
                <Gradient name='rainbow'>
                    <BigText text={pkg.name} font="simpleBlock" space={false} />
                </Gradient>
            </Box>

            <Box marginLeft={2} flexDirection="column" >
                <Box>
                    <Text color="green">Error: </Text>
                    <Text backgroundColor="#EA3323"> {0} </Text>
                </Box>
                <Box>
                    <Text>
                        <Text color="green">Branches:</Text>
                        <Text color="#D98A5C"> {props.branchNumber}</Text>
                        <Newline />
                    </Text>
                </Box>
            </Box>
        </Box>
    )
};

export default Logo
