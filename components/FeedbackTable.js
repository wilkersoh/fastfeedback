import React from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';

import RemoveButton from '@/components/RemoveButton';
import FeedbackRow from './FeedbackRow';

function toggleFeedback() {
  console.log('object');
}

const FeedbackTable = ({ feedbacks }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback) => (
          <FeedbackRow key={feedback.id} {...feedback} />
          // <Box key={feedback.id} as="tr">
          //   <Td fontWeight="medium">{feedback.author}</Td>
          //   <Td>{feedback.text}</Td>
          //   <Td>
          //     <Code>{'/'}</Code>
          //   </Td>
          //   <Td>
          //     <Switch
          //       variantColor="green"
          //       onClick={toggleFeedback}
          //       defaultIsChecked={feedback.status === 'active'}
          //       size="md"
          //     />
          //   </Td>
          //   <Td>
          //     <RemoveButton feedbackId={feedback.id} />
          //   </Td>
          // </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
