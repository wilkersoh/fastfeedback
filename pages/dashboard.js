import useSWR from 'swr';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
import SiteTableSkeleton from '@/components/SiteTableSeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import { useAuth } from '@/lib/auth';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, error } = useSWR(
    user ? ['/api/sites', user.token] : null,
    fetcher
  );

  const isPaidAccount = user?.stripeRole;

  if (!data) {
    console.log('---render dashboard no data----'); // x3
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites?.length) {
    console.log('---render dashboard has data----'); // 1
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        {data.sites?.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
    );
  }

  console.log('---render dashboard paid account----');
  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  );
}
