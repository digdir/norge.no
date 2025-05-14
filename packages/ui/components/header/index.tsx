/* eslint-disable */
import {Button, Heading, Tabs} from '@digdir/designsystemet-react';
import styles from './style.module.css';

export function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.container}>
        <Heading level={1}>Norge.no</Heading>
        <div className={styles.headerNav}>
          <Tabs>
            <Tabs.List>
              <Tabs.Tab value="value1">Privat</Tabs.Tab>
              <Tabs.Tab value="value2">Virksomhet</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="primary"
            data-size="lg"
          >
            Meny
          </Button>
        </div>
      </div>
    </header>
  );
}
