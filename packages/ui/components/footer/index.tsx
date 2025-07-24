import {Heading, Link, Paragraph} from '@digdir/designsystemet-react';
import {Logo} from '../logo/index.tsx';
import styles from './style.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerItemContainer}>
        <div className={styles.footerContent}>
          <Logo theme="light" />
          <Paragraph className={styles.footerItem}>
            Norge.no er en veiviser utviklet av Digitaliseringsdirektoratet
          </Paragraph>
        </div>
        <div className={styles.footerContent}>
          <Heading
            level={3}
            data-size="xs"
          >
            Kontakt
          </Heading>
          <Link
            href="mailto:brukerstøtte@digdir.no"
            className={styles.footerItem}
          >
            Brukerstøtte@digdir.no
          </Link>
          <Paragraph className={styles.footerItem}>
            NB! Ikke send sensitive opplysninger om deg selv og din elektroniske
            ID på e-post.
          </Paragraph>
        </div>
        <div className={styles.footerContent}>
          <Heading
            level={3}
            data-size="xs"
          >
            Om nettstedet
          </Heading>
          <Link className={styles.footerItem}>Tilgjengelighetserklæring</Link>
          <Link className={styles.footerItem}>Personvernerklæring</Link>
          <Link className={styles.footerItem}>Informasjonskapsler </Link>
        </div>
      </div>
    </footer>
  );
}
