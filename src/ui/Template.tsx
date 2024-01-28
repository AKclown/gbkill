import React from 'react';
import { Box, Text, Spacer } from 'ink';
import Logo from './Logo.js';
import List, { IList } from './List.js';

const Template: React.FC<IList> = (props) => {
    return (
        <Box flexDirection="column" >
            <Logo branchNumber={props.branches.length} />
            <Box>
                <Text backgroundColor="#C1FDB7" color="#040404">  🤡 Space delete merge; Tab delete unmerged; RightArrow batch selection 🤡  </Text>
                <Spacer />
                <Text>merge</Text>
            </Box>

            <List branches={props.branches} merged={props.merged} onEventTrigger={props.onEventTrigger} />
        </Box>
    )
};

export default Template
