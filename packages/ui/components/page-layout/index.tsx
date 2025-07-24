import {Divider} from '@digdir/designsystemet-react';
import {Header} from '../header';
import styles from './style.module.css';
import { Footer } from "../footer/index.tsx";

export function PageLayout({children}) {
  return (
    <div className={styles.container}>
      <Header />
      <Divider />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}
