import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core';

import DashboardShell from '@/components/DashboardShell';
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  console.log('-------hey ce---------');
  console.log(siteId);
  console.log(route);
  console.log('check top context');
  // const { feedback } = await getAllFeedback(siteId);

  // return {
  //   props: {
  //     initialFeedback: 'de'
  //   },
  //   revalidate: 1 // every sec keep update if has new
  // };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  console.log('---------check below--------');
  console.log(sites);

  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));

  return {
    paths,
    fallback: true
  };
}

/**

*/

const FeedbackPage = ({ initialFeedback, site }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  // useEffect(() => {
  //   setAllFeedback(initialFeedback);
  // }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      router: route || '/',
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };
    const { id } = createFeedback(newFeedback);
    inputEl.current.value = '';
    setAllFeedback([{ id, ...newFeedback }, ...allFeedback]);
  };

  return (
    <DashboardShell>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} type="comment" id="comment" />
            <Button
              type="submit"
              fontWeight="medium"
              mt={2}
              isDisabled={router.isFallback}
              // disable when button inside the fallback (fallback: true)
            >
              Add Comment
            </Button>
          </FormControl>
        </Box>
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
