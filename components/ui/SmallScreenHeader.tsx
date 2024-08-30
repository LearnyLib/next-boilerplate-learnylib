import { useTheme } from '@mui/material';
import styles from '../../styles/learnylib.module.css';
import NavTop from './NavTop';

/**
 * Header qui s'affiche uniquement en mode "petit écran"
 * @returns {JSX.Element}
 */
export default function SmallScreenHeader(): JSX.Element {
  const theme = useTheme();
  return (
    <header
      className={styles.smallScreenHeader}
      style={{ backgroundColor: theme.palette.background.nav }}
    >
      <NavTop />
    </header>
  );
}
