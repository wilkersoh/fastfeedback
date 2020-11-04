import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';

const FeedbackTable = ({ allFeedback }) => {
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
        {allFeedback.map((feedback) => (
          <Box key={feedback.id} as="tr">
            <Td fontWeight="medium">{feedback.name}</Td>
            <Td fontWeight="medium">{feedback.name}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td>{'Remove'}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
