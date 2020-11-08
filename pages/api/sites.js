import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';

export default async (req, res) => {
  // 这里的 api 怎样 被call？ 又 没有 import， 它是在 pages里面 所以哪个hit api/sites 就called了啊
  // req.headers - passing dashboard SWR > utils/fetcher > here
  // req.headers.token 哪里来的， 从 dashboard SWR pass 来的 args
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const sites = await getUserSites(uid);

    // json value is the mutate callback value
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error });
  }
};
