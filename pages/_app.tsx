import type { ReactElement, ReactNode } from 'react';
// import { SessionProvider } from "next-auth/react";
// import type { Session } from "next-auth"
import type { NextPage } from 'next';
import type { AppLayoutProps } from 'next/app';
import 'src/styles/global.scss';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Script from 'next/script';

import { Provider } from 'react-redux';
import { wrapper } from '@/store/store';

// import Transition from '@/components/Transition';

const clientSideEmotionCache = createEmotionCache();

// redux wrapper

//

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
interface TokyoAppProps extends AppLayoutProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(_props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = _props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    // <SessionProvider session={pageProps.session}>
    <CacheProvider value={emotionCache}>
      <Head>
        <title>WeJustGrab</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
        <SidebarProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
              />
              {/* <Transition> */}
              {getLayout(<Component {...props.pageProps} />)}
              {/* </Transition> */}
            </LocalizationProvider>
          </ThemeProvider>
        </SidebarProvider>
      </Provider>

    </CacheProvider>
    // </SessionProvider>

  );
}

export default TokyoApp;
