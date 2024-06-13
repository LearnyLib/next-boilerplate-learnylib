import { useAppConfig } from '../../hooks';
import styles from '../../styles/learnylib.module.css';
import NavTop from './NavTop';

/**
 * Header qui s'affiche uniquement en mode "petit écran"
 * @returns {JSX.Element}
 */
export default function SmallScreenHeader(): JSX.Element {
  const config = useAppConfig();
  return (
    <header
      className={styles.smallScreenHeader}
      style={{ backgroundColor: config?.theme.colors.dark }}
    >
      <NavTop />
    </header>
  );
}
