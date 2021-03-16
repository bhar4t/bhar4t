import Head from "next/head";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Bootstrap */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400&family=Sacramento&display=swap"
          rel="preload"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
