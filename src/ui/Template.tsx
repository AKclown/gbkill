import React, { useState, useEffect } from 'react';
import { render, Box, Text, Newline } from 'ink';
import Table from 'ink-table'
import Logo from './Logo.js';

interface IList {
    branches: Array<any>;
}

const List: React.FC<IList> = (props) => {
    // const colors = ['#9999FE', '#FD999A']
    return (
        <Box flexDirection="column" >
            <Logo branchNumber={props.branches.length} />
            <Text backgroundColor="#C1FDB7" color="#040404">  🤡 Space delete merge; Tab delete unmerged; Shift batch selection 🤡  </Text>
        </Box>
    )
};

export default List
