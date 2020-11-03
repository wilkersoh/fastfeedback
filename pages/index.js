import Head from 'next/head';
import NextLink from 'next/link';
import { useAuth } from '@/lib/auth';

import {
  Button,
  Box,
  Code,
  Text,
  Icon,
  Heading,
  Flex,
  Link
} from '@chakra-ui/core';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex as="main" m="auto">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />

        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" textAlign="center">
        <Heading>Fast Feedback</Heading>
        <Icon name="logo" size="64px" />
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <>
            <Button onClick={(e) => auth.signout()}>Sign Out</Button>
            <NextLink href="/dashboard" passHref>
              <Link>View Dashboard</Link>
            </NextLink>
          </>
        ) : (
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
      </Box>
    </Flex>
  );
}
