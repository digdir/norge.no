import type {ReactNode} from 'react';
import styles from './style.module.css';

export function PageLayout({children}: {children: ReactNode}) {
  return <main className={styles.container}>{children}</main>;
}
