'use client';
import styles from '../../styles/learnylib.module.css';
import Menu from './Menu';
import LightButton from './LightButton';
import UserWidget from './UserWidget';
import NavTop from './NavTop';
import { useTheme } from '@mui/material';

/**
 * Barre de navigation de l'application
 * @returns {JSX.Element} - Composant JSX
 */
export default function Nav(): JSX.Element {
  const theme = useTheme();

  return (
    <nav
      className={styles.nav}
      style={{ backgroundColor: theme.palette.background.nav }}
    >
      <NavTop />

      <Menu />

      <div className={styles.navBottom}>
        <UserWidget />

        <LightButton />
      </div>
    </nav>
  );
}
