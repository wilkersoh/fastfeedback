const title =
  'Fast Feedback – The easiest way to add comments or reviews to your static site.';
const description = 'Feedback';

// automatic added into head
const SEO = {
  title,
  description,
  canonical: 'https://url.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://url.com',
    title,
    description,
    images: [
      {
        url: 'https://url.com/og.png',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  }
};

export default SEO;
