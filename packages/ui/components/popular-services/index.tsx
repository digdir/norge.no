import {Heading} from '@digdir/designsystemet-react';
import styles from './style.module.css';

interface ServiceItemProps {
  logo: React.ReactNode;
  title: string;
  organization: string;
}

function ServiceItem({logo, title, organization}: ServiceItemProps) {
  return (
    <div className={styles.popularServiceItem}>
      <div className={styles.serviceLogo}>{logo}</div>
      <div className={styles.serviceInfo}>
        <div className={styles.serviceTitle}>{title}</div>
        <div className={styles.serviceOrg}>{organization}</div>
      </div>
      <div className={styles.serviceArrow}>↗</div>
    </div>
  );
}

export function PopularServices() {
  return (
    <section className={styles.popularServices}>
      <Heading level={2}>Akkurat nå er dette mye brukt</Heading>

      <div className={styles.popularServicesList}>
        <ServiceItem
          logo={<div className={styles.navLogo}>nav</div>}
          title="Svangerskapspenger"
          organization="NAV"
        />

        <ServiceItem
          logo={<div className={styles.skattLogo}>S</div>}
          title="Skattekort, frikort og forskuddsskatt"
          organization="Skatteetaten"
        />
      </div>
    </section>
  );
}
