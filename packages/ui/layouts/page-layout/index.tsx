import type {ReactNode} from 'react';
import styles from './style.module.css';

export function PageLayout({children}: {children: ReactNode}) {
  return <article className={styles.container}>{children}</article>;
}
