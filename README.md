## Feedback Product

First, run the development server:

```bash
npm install
npm run dev
# or
npm install
yarn dev
```

.env
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY



page/feedback/[...site] 有点问题
page/site/[...site] 有点问题


#  useSwr
```javascript
const {data, error} = useSWR("api/endpoint", (url) => axios(url).then(r => r.data));
// can use <SWRConfig value={{fetcher: (url) => axiois(url).thenr => r.data}}>  </SWRConfig>
-----

const { data, error } = useSWR(
    user ? ['/api/sites', user.token] : null,
    async (url, token) => {
      const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json', token}),
      })
    }
  );



```