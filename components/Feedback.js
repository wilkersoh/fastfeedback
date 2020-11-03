import { Text, Box, Heading } from '@chakra-ui/core';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => {
  return (
    <Box borderRadius={4} maxW="700px">
      <Heading size="sm" as="h3" mb={0}>
        {author}
      </Heading>
      <Text color="gray.500" mb={4}>
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color="blue.500">{text}</Text>
    </Box>
  );
};

export default Feedback;
