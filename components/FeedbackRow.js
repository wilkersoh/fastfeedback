import React, { useState, useEffect } from 'react';

import { updateFeedback } from '@/lib/db';

import { mutate, trigger } from 'swr';
import { useAuth } from '@/lib/auth';

import { Box, Code, Switch, IconButton } from '@chakra-ui/core';
import { Td } from './Table';

import RemoveButton from '@/components/RemoveButton';
import { useRef } from 'react';

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === 'active');

  const toggleFeedback = async (e) => {
    setChecked(!checked);
    await updateFeedback(id, { status: !checked ? 'active' : 'pending' });
    // trigger(['/api/feedback', auth.user.token]); // can get latest cache data. but not apply into dom yet
    mutate(['/api/feedback', auth.user.token]); // mutate is mutating the cache first then after go to the server then update your cache, not in this use case
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
          defaultIsChecked={status == 'active'}
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
