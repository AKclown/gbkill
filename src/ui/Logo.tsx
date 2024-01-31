import React, { useEffect, useState } from 'react';
import { Box, Text, Newline } from 'ink';
import Gradient from 'ink-gradient';
import figlet from 'figlet';
import eventBus, { EVENT_TYPE } from '../eventBus.js';

interface ILogo {
    branchNumber: number;
}

const name = figlet.textSync('GBKILL', {
    font: "Small Isometric1",
})

const Logo: React.FC<ILogo> = (props) => {

    const [error, setError] = useState([])
    const [amount, setAmount] = useState(1)

    // *********************
    // Life Cycle Function
    // *********************

    useEffect(() => {
        eventBus.subscribe(EVENT_TYPE.ERROR, (payload: any) => {
            setError(payload)
        })

        eventBus.subscribe(EVENT_TYPE.AMOUNT, (payload: any) => {
            setAmount(payload)
        })
    }, [])

    // *********************
    // Service Function
    // *********************

    // *********************
    // View
    // *********************

    return (
        <Box alignItems="flex-end">
            <Box>
                <Gradient name='rainbow'>
                    <Text>{name} </Text>
                </Gradient>
            </Box>

            <Box marginLeft={2} flexDirection="column" >
                <Box>
                    <Text color="blue">Batch: </Text>
                    <Text backgroundColor="blue"> {amount} </Text>
                </Box>
                <Box>
                    <Text color="#EA3323">Error: </Text>
                    <Text backgroundColor="#EA3323"> {error.length} </Text>
                </Box>
                <Box>
                    <Text>
                        <Text color="green">Branches:</Text>
                        <Text color="#D98A5C"> {props.branchNumber} </Text>
                        <Newline />
                    </Text>
                </Box>
            </Box>
        </Box>
    )
};

export default Logo
