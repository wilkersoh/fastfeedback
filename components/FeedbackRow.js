import React, { useState, useEffect } from 'react';

import { updateFeedback } from '@/lib/db';

import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

import { Box, Code, Switch, IconButton } from '@chakra-ui/core';
import { Td } from './Table';

import RemoveButton from '@/components/RemoveButton';

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    updateFeedback(id, { status: checked ? 'active' : 'pending' });
    console.log(checked);
    mutate(['/api/feedback', auth.user.token]);
  }, [setChecked]);

  const toggleFeedback = (e) => {
    setChecked(!checked);
    // updateFeedback(id, { status: checked ? 'pending' : 'active' });
  };
  console.log('----render in feedbackRow---');
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
