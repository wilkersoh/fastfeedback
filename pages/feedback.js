import useSWR from 'swr';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import SiteTableSkeleton from '@/components/SiteTableSeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';

export default function MyFeedback() {
  const { user } = useAuth();
  const { data, error } = useSWR(
    user ? ['/api/feedback', user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.feedback.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
