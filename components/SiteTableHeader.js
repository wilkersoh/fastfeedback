import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box
} from '@chakra-ui/core';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = ({ isPaidAccount }) => {
  console.log(isPaidAccount);
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
        {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </Box>
  );
};

export default SiteTableHeader;
