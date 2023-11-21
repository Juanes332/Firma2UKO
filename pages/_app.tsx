import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AuthProvider } from "contexts/JWTAuthContext";
import SettingsProvider from "contexts/SettingsContext";
import TitleContextProvider from "contexts/TitleContext";
import createEmotionCache from "createEmotionCache";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Fragment, useEffect } from "react";
import "react-image-lightbox/style.css";
import "simplebar/dist/simplebar.min.css";
import MainApp from "../src/App";
import "../src/__fakeApi__";
import "../src/components/Layouts/stylesPdf.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: any;
  pageProps: any;
  emotionCache?: EmotionCache;
}

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({ showSpinner: false });

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {
  const Layout = Component.layout || Fragment;

  console.log(Layout);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <SettingsProvider>
            <TitleContextProvider>
              <Layout>
                <MainApp>
                  <Component {...pageProps} />
                </MainApp>
              </Layout>
            </TitleContextProvider>
          </SettingsProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;
