import {Heading, Link} from '@digdir/designsystemet-react';
import styles from './style.module.css';
import {
  SackKronerIcon,
  PersonGroupIcon,
  HandHeartIcon,
  Buildings3Icon,
  PlantIcon,
  HouseHeartIcon,
  TruckIcon,
  HospitalIcon,
  HatSchoolIcon,
  TapWaterIcon,
  HardHatIcon,
  HeadHeartIcon,
  TrayFoodIcon,
  ReceptionIcon,
  FlowerPetalFallingIcon,
} from '@navikt/aksel-icons';

const serviceCategoryNames = [
  {
    name: 'Skatt, regnskap og toll',
    icon: (
      <SackKronerIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Personale',
    icon: (
      <PersonGroupIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Miljø og sikkerhet',
    icon: (
      <HandHeartIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Forhold ved virksomheten',
    icon: (
      <Buildings3Icon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Jordbruk og hav',
    icon: (
      <PlantIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Bygg, anlegg og eiendom',
    icon: (
      <HouseHeartIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Transport og lagring',
    icon: (
      <TruckIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Helse, pleie og omsorg',
    icon: (
      <HospitalIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Oppvekst og utdanning',
    icon: (
      <HatSchoolIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Energi, vann, avløp, avfall',
    icon: (
      <TapWaterIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Industrier',
    icon: (
      <HardHatIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Kultur og frivillighet',
    icon: (
      <HeadHeartIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Handel og overnatting',
    icon: (
      <TrayFoodIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Tjenesteytende næringer',
    icon: (
      <ReceptionIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
  {
    name: 'Dødsfall og arv',
    icon: (
      <FlowerPetalFallingIcon
        title="a11y-title"
        fontSize="1.5rem"
      />
    ),
  },
];

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
}

function CategoryCard({name, icon}: CategoryCardProps) {
  return (
    <Link
      href={`/services/${name?.toLowerCase().replace(/\s+/g, '-')}`}
      className={styles.serviceCard} // Ensure this style exists in the imported CSS module
    >
      {icon}
      <span className={styles.serviceTitle}>{name}</span>
    </Link>
  );
}

export function ServiceCategoryGrid() {
  return (
    <section className={styles.servicesSection}>
      <Heading level={2}>Alle innbyggertjenester</Heading>
      <div className={styles.servicesGrid}>
        {serviceCategoryNames.map((category, index) => (
          <CategoryCard
            key={index} // Prefer a stable ID from your data if available
            name={category.name}
            icon={category.icon}
          />
        ))}
      </div>
    </section>
  );
}
