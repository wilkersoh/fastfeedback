import useSWR from 'swr';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

import SiteTableSkeleton from '@/components/SiteTableSeleton';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTable from '@/components/FeedbackTable';

export default function MyFeedback() {
  const { user } = useAuth();
  const { data, error } = useSWR(
    user ? ['/api/feedback', user.token] : null,
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
      <FeedbackTableHeader />
      {data.feedback?.length ? (
        <FeedbackTable feedbacks={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
