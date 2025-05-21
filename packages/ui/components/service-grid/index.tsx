import {Heading, Link} from '@digdir/designsystemet-react';
import styles from './style.module.css';
import {useServices} from '@hooks/services';

import type {CMSService} from '@packages/types'; // Assuming @packages is a path alias

function ServiceCard({Title, icon}: Partial<CMSService>) {
  // Assuming icon has a url property
  return (
    <Link
      href={`/services/${Title?.toLowerCase().replace(/\s+/g, '-')}`}
      className={styles.serviceCard} // Ensure this style exists in the imported CSS module
    >
      {/* <img
        src={icon?.url}
        alt=""
        width={30}
        height={30}
        className={styles.serviceIcon}
      /> */}
      <span className={styles.serviceTitle}>{Title}</span>
    </Link>
  );
}

export function ServiceGrid() {
  const {data: servicesData, isLoading, error, isFetching} = useServices();

  if (isLoading) {
    return (
      <section className={styles.servicesSection}>
        <Heading level={2}>Alle innbyggertjenester</Heading>
        <p>Loading services...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.servicesSection}>
        <Heading level={2}>Alle innbyggertjenester</Heading>
        <p>Error loading services: {(error as Error).message}</p>
      </section>
    );
  }

  const services = servicesData || [];

  return (
    <section className={styles.servicesSection}>
      <Heading level={2}>Alle innbyggertjenester</Heading>
      {isFetching && (
        <p>
          <em>(Updating in background...)</em>
        </p>
      )}
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.id || index} // Prefer a stable ID from your data if available
            Title={service.Title}
            // icon={service.icon} // Pass the actual icon object if needed by ServiceCard
          />
        ))}
        {services.length === 0 && !isLoading && <p>No services found.</p>}
      </div>
    </section>
  );
}
