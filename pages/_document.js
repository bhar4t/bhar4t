import Document, { Html, Head, Main, NextScript } from 'next/document'
import MouseContextProvider from "../context/mouse-context"

const APP_NAME = 'Webkoof.in'
const APP_DESCRIPTION = 'Code with BHARAT SAHU | BHAR4T'

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#d3bf00' />
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
          
          <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-icon-180x180.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/images/favicon.ico' />
        </Head>
        <body>
          <MouseContextProvider>
            <Main />
            <NextScript />
          </MouseContextProvider>
        </body>
      </Html>
    )
  }
}