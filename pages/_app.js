import { Provider, useSelector } from "react-redux";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import "@/styles/globals.css";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import store from "@/store/store";
import CookieConsentComponent from "@/components/CookieConstent";


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Protest+Strike&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.png"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Droid Serif"
          rel="stylesheet"
        ></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="Ex6NfCMVOiD-FLDiWxV8-XsLlKokFwFIKGCJ_wPX4i8"
        />
        <script
          src="https://kit.fontawesome.com/e283f5f527.js"
          crossorigin="anonymous"
        ></script>

        {/* Google Adsense Code */}
        {process.env.NEXT_PUBLIC_PRODUCTION ? (
          <Script
            id="adsbygoogle-init"
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4131180580860903"
          />

        ) : null}


        {/* Adbloacker Script */}

        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-4131180580860903?ers=1"
          nonce="bANSMe-qXvls0bNz1Mb2Lg"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function signalGooglefcPresent() {
                  if (!window.frames['googlefcPresent']) {
                    if (document.body) {
                      const iframe = document.createElement('iframe');
                      iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                      iframe.style.display = 'none';
                      iframe.name = 'googlefcPresent';
                      document.body.appendChild(iframe);
                    } else {
                      setTimeout(signalGooglefcPresent, 0);
                    }
                  }
                }
                signalGooglefcPresent();
              })();
            `,
          }}
        ></script>



        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R85Y20GRL2"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R85Y20GRL2');
          `,
          }}
        />
      </Head>
      <NextTopLoader color="#4a00e0" showSpinner={false} />
      <NavBar />
      <Component {...pageProps} />
      <CookieConsentComponent />
      <Footer />
    </Provider>
  );
}
