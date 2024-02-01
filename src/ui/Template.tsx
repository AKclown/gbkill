import React from 'react';
import { Box, Text, Spacer, useStdin } from 'ink';
import Logo from './Logo.js';
import List, { IList } from './List.js';
import colors from 'colors';

const Template: React.FC<IList> = props => {
  const { isRawModeSupported } = useStdin();

  if (!isRawModeSupported) {
    console.log(
      colors.red(
        `Oh no! GBkill does not support this terminal (TTY is required). This is a bug, which has to be fixed. Please try another command interpreter (for example, CMD in windows)`
      )
    );
  }

  return (
    <Box flexDirection="column">
      {isRawModeSupported ? (
        <>
          <Logo branchNumber={props.branches.length} />
          <Box>
            <Text backgroundColor="#C1FDB7" color="#040404">
              {' '}
              {'>'} Space delete merge; Tab delete unmerged; RightArrow batch
              selection {'<'}{' '}
            </Text>
            <Spacer />
            <Text>merge</Text>
          </Box>
          <List
            branches={props.branches}
            merged={props.merged}
            onEventTrigger={props.onEventTrigger}
          />
        </>
      ) : (
        <Box>
          <Text></Text>
        </Box>
      )}
    </Box>
  );
};

export default Template;
