// import App from 'next/app'
import withDarkMode from 'next-dark-mode'
import Head from "next/head";
import "../styles/global.css";
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export const config = {
  amp: 'hybrid',
}

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Local fonts */}
        <link
            rel="preload"
            href="/fonts/Sacramento/Sacramento-Regular.ttf"
            as="font"
            crossOrigin=""
          />
        <link
          rel="preload"
          href="/fonts/Inter/static/Inter-Thin.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/static/Inter-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/static/Inter-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default withDarkMode(App)