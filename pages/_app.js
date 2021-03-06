import Head from 'next/head';
import { AuthProvider } from '@/lib/auth';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import theme from '@/styles/theme';
import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.config';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
            min-width: 360px;
            background-color: #edf2f7;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
