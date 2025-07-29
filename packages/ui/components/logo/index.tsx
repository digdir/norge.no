import {Paragraph} from '@digdir/designsystemet-react';
import styles from './style.module.css';

interface LogoProps {
  theme?: 'dark' | 'light';
}

export function Logo({theme = 'dark'}: LogoProps) {
  return (
    <a
      href="/"
      className={styles.logo}
    >
      <img
        src={theme === 'light' ? '/logo_light.svg' : '/logo_dark.svg'}
        alt="Site Logo"
      />
      <Paragraph
        data-size="lg"
        variant="default"
      >
        Norge.no
      </Paragraph>
    </a>
  );
}
