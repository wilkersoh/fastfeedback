import React from 'react';
import { parseISO, format } from 'date-fns';
import { Box, Link } from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';
import NextLink from 'next/link';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box key={site.link} as="tr">
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              <NextLink href={`/p/${site.id}`} passHref>
                <Link>View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
