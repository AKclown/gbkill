import React, { useState } from 'react';
import { render, Box, Text, Newline, useInput } from 'ink';

const App = () => {
  return (
    <Box flexDirection="column">
      <Text>
        Welcome to the Node.js scaffolding tool.
      </Text>
      <Newline />
      <Text>
        Please enter the name of your project:
      </Text>
      <Newline />
      <Text>
        <Text color="green">Project Name:</Text>
      </Text>
      <Newline />
      <Text>
        Press Enter to create the project.
      </Text>
      <Newline />
      <Text>
        <Text color="gray">(Press Ctrl+C to exit)</Text>
      </Text>
      <Newline />
      <Text>
        <Text color="gray">Note: This is just a simple example. You can add more features and interactivity as needed.</Text>
      </Text>
      <Newline />
      <Text>
        <Text color="gray">Hint: You can use useInput hook to capture user input and trigger actions.</Text>
      </Text>
      <Newline />
    </Box>
  );
};

render(<App />);