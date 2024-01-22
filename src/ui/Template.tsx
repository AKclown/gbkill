import React, { useState, useEffect } from 'react';
import { render, Box, Text, Newline, Spacer } from 'ink';
import Table from 'ink-table'
import Logo from './Logo.js';
import List from './List.js';

interface ITemplate {
    branches: Array<any>;
    onEventTrigger: (branches: Array<any>) => void;
}

const Template: React.FC<ITemplate> = (props) => {
    // const colors = ['#9999FE', '#FD999A']
    return (
        <Box flexDirection="column" >
            <Logo branchNumber={props.branches.length} />
            <Box>
                <Text backgroundColor="#C1FDB7" color="#040404">  🤡 Space delete merge; Tab delete unmerged; RightArrow batch selection 🤡  </Text>
                <Spacer />
                <Text>merged</Text>
            </Box>

            <List branches={props.branches} onEventTrigger={props.onEventTrigger} />
        </Box>
    )
};

export default Template
