import {Chip} from '@digdir/designsystemet-react';
import styles from './style.module.css';

export function QuickLinks() {
  const links = [
    'Jeg vil søke barnehageplass',
    'Hva må jeg huske på når jeg starter et selskap?',
    'Jeg har mistet jobben',
    'Kan jeg søke om utsettelse på restskatten?',
    'Hvordan får jeg MinID?',
    '+ Vis flere',
  ];

  return (
    <div className={styles.quickLinks}>
      {links.map((link, index) => (
        <Chip.Button
          key={index}
          color="second"
        >
          {link}
        </Chip.Button>
      ))}
    </div>
  );
}
