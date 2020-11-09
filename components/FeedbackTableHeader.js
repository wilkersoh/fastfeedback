import React from 'react';
import NextLink from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box
} from '@chakra-ui/core';

import AddSiteModal from './AddSiteModal';

const FeedbackTableHeader = ({ isPaidAccount, siteName }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback" passHref>
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{siteName}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Feedback</Heading>
      {/* <AddSiteModal>+ Add Site</AddSiteModal> */}
    </Flex>
  </Box>
);

export default FeedbackTableHeader;
