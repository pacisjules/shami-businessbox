import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import Layout from "../app/layouts/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/") {
    return (
      <div>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </div>
    );
  } else {
    return (
      <Layout>
        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
