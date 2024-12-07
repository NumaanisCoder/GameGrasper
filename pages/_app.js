import { Provider } from "react-redux";
import store from "@/store/store";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import "@/styles/globals.css";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NextTopLoader from "nextjs-toploader";
import CookieConsentComponent from "@/components/CookieConstent";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  // Handle dynamic script injection
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://fundingchoicesmessages.google.com/i/pub-4131180580860903?ers=1";
    document.body.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
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
    `;
    document.body.appendChild(inlineScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(inlineScript);
    };
  }, []);

  // Check for custom layout in the page component
  const getLayout = Component.getLayout || ((page) => (
    <>
      <NavBar />
      {page}
      <Footer />
    </>
  ));

  return (
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={2000}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Protest+Strike&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/GameGrasperLogo.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-site-verification" content="Ex6NfCMVOiD-FLDiWxV8-XsLlKokFwFIKGCJ_wPX4i8" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4131180580860903"
            crossOrigin="anonymous"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-9LH71NM0T4"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-9LH71NM0T4');
              `,
            }}
          />
        </Head>
        <NextTopLoader color="red" showSpinner={false} zIndex={99999} />
        {getLayout(<Component {...pageProps} />)}
        <CookieConsentComponent />
      </SnackbarProvider>
    </Provider>
  );
}
