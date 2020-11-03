export default async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin'
  });

  return res.json(); // 这里的 data 会pass回去 dashboard useSWR()
};
