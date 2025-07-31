import {Dropdown, Paragraph} from '@digdir/designsystemet-react';
import {MenuHamburgerIcon} from '@navikt/aksel-icons';
import styles from './style.module.css';

export function SiteMenu() {
  return (
    <div className={styles.menu}>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger
          data-size="xs"
          className={styles.menu}
          variant="secondary"
        >
          <MenuHamburgerIcon />
          Meny
        </Dropdown.Trigger>
        <Dropdown
          data-color="neutral"
          data-size="sm"
          className={styles.menu} // Apply custom styles
          placement="right"
        >
          <Dropdown.List>
            <Dropdown.Item>
              <Dropdown.Button>Valg 1</Dropdown.Button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown.Button>Valg 2</Dropdown.Button>
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    </div>
  );
}
