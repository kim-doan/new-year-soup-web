import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import 'configs/recoil';
import styles from './layout.module.css';
import Head from 'next/head';
import NavigationBar from './components/layout/navigationBar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className={styles.main}>
            <NavigationBar />
            <Component {...pageProps} />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
