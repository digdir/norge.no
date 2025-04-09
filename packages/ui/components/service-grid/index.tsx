import {Heading, Link} from '@digdir/designsystemet-react';
import styles from './style.module.css';

import type {CMSService} from '@packages/types';

interface ServiceGridProps {
  services?: CMSService[];
}

function ServiceCard({Title, icon}: Partial<CMSService>) {
  const iconUrl = `http://127.0.0.1:1337${icon}`;
  return (
    <Link
      href={`/services/${Title?.toLowerCase().replace(/\s+/g, '-')}`}
      className={styles.serviceCard}
    >
      <img
        src={iconUrl}
        alt={`${Title} icon`}
        width={30}
        height={30}
        className={styles.serviceIcon}
      />
      <span className={styles.serviceTitle}>{Title}</span>
    </Link>
  );
}

export function ServiceGrid({services}: ServiceGridProps) {
  return (
    <section className={styles.servicesSection}>
      <Heading level={2}>Alle innbyggertjenester</Heading>
      <div className={styles.servicesGrid}>
        {services?.map((service, index) => (
          <ServiceCard
            key={index}
            Title={service.Title}
            icon={service.icon.url}
          />
        ))}
      </div>
    </section>
  );
}
