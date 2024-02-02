import React from 'react';
import { Box, Text } from 'ink';

interface IVersion {
  lastVersion: string;
  currentVersion: string;
}

const Version: React.FC<IVersion> = props => {
  const { lastVersion, currentVersion } = props;
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      borderStyle="single"
      borderColor="#D2D211"
      paddingTop={1}
      paddingBottom={1}
      marginBottom={1}
    >
      <Box>
        <Text>
          Update available! <Text color="#BC584F">{currentVersion}</Text> {'->'}{' '}
          <Text color="#12824D">{lastVersion}</Text>
        </Text>
      </Box>
      <Box>
        <Text>
          <Text color="#C965C9">Plan: </Text>
          <Text>https://github.com/AKclown/gbkill/issues/2</Text>
        </Text>
      </Box>
      <Box>
        <Text>
          Run "<Text color="#C965C9">npm install -g gbkill</Text>" to update.
        </Text>
      </Box>
    </Box>
  );
};

export default Version;
