import styles from './style.module.css';
import {Logo} from '../logo';
import {LanguageSelector} from '../language-selector';
import {SiteMenu} from '../site-menu';
import {SignIn} from '../sign-in';

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.controls}>
        <SiteMenu />
        <LanguageSelector />
        <SignIn dataSize="xs" />
      </div>
    </header>
  );
}
