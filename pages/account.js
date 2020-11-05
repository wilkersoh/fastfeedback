import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';

import { Box, Button } from '@chakra-ui/core';
import { createCheckoutSession } from '@/lib/db';

export default function Account() {
  const { user } = useAuth();
  // const { data, error } = useSWR(
  //   user ? ['/api/sites', user.token] : null,
  //   fetcher
  // );

  return (
    <DashboardShell>
      <Box>
        <Button
          onClick={(e) => createCheckoutSession(user.uid)}
          backgroundColor="gray.900"
          color="white"
          variant="outline"
          fontWeigh="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95' }}
        >
          Update to Starter
        </Button>
      </Box>
    </DashboardShell>
  );
}
