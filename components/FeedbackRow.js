import React, { useState } from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/core';
import { Td } from './Table';

import RemoveButton from '@/components/RemoveButton';

const FeedbackRow = ({ id, author, text, route, status }) => {
  const [checked, setChecked] = useState(false);
  console.log('default: ', checked);

  const toggleFeedback = (e) => {
    setChecked(!checked);
    console.log('trigger: ', checked);
  };

  console.log('----render----');
  return (
    <Box key={id} as="tr">
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          variantColor="green"
          onChange={toggleFeedback}
          defaultIsChecked={status === 'active'}
          size="md"
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
