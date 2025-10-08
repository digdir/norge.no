import {Divider} from '@digdir/designsystemet-react';
import type {ReactNode} from 'react';

import {Header} from '../../components/header/index.tsx';
import styles from './style.module.css';
import {Footer} from '../../components/footer/index.tsx';
import {queryClient} from '@packages/data-access/react-query/query-client';
import {QueryClientProvider} from '@tanstack/react-query';

import '@digdir/designsystemet-css';
import '@digdir/designsystemet-theme';

export function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="no">
      <head>
        <meta charSet="UTF-8"/>
        <link rel="icon" href="./favicon.ico" type="image/x-icon"/>
        <link
          rel="stylesheet"
          href="https://altinncdn.no/fonts/inter/v4.1/inter.css"
          integrity="sha384-OcHzc/By/OPw9uJREawUCjP2inbOGKtKb4A/I2iXxmknUfog2H8Adx71tWVZRscD"
          crossOrigin="anonymous"
        />
      </head>
      <QueryClientProvider client={queryClient.get()}>
        <body className={styles.container}>
          <Header />
          <Divider />
          <main className={styles.mainContent}>{children}</main>
          <Footer />
        </body>
      </QueryClientProvider>
    </html>
  );
}
