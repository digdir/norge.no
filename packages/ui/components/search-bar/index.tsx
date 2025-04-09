import {Search} from '@digdir/designsystemet-react';
import styles from './style.module.css';

export function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <Search >
          <Search.Input  aria-label="Søk" style={{ borderColor: "transparent" }} />
          <Search.Clear />
        </Search>
      </div>
    </div>
  );
}
