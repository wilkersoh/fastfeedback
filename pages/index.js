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
  Stack,
  Link
} from '@chakra-ui/core';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex as="main" m="auto">
      <Head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/site"
          }
        `
          }}
        /> */}
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
            <NextLink href="/site" passHref>
              <Link>View Dashboard</Link>
            </NextLink>
          </>
        ) : (
          <Stack>
            <Button
              onClick={(e) => auth.signinWithGithub()}
              leftIcon="github"
              backgroundColor="gray.900"
              color="white"
              fontWeigh="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.95' }}
            >
              Sign in with Github
            </Button>
            <Button
              onClick={(e) => auth.signinWithGoogle()}
              leftIcon="google"
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeigh="medium"
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.100', transform: 'scale(0.95' }}
            >
              Sign in with Google
            </Button>
          </Stack>
        )}
      </Box>
    </Flex>
  );
}
