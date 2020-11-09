import useSWR from 'swr';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

import SiteTableSkeleton from '@/components/SiteTableSeleton';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTable from '@/components/FeedbackTable';
import Page from '@/components/Page';
import { useRouter } from 'next/router';

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data, error } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader siteName={'data.name'} />
      {data.feedback?.length ? (
        <FeedbackTable feedbacks={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

const SiteFeedbackPage = () => (
  <Page>
    <SiteFeedback />
  </Page>
);

export default SiteFeedbackPage;
