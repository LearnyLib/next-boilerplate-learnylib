'use client';
import styles from '../../styles/learnylib.module.css';
import Menu from './Menu';
import LightButton from './LightButton';
import UserWidget from './UserWidget';
import useAppConfig from '../../hooks/useAppConfig';
import NavTop from './NavTop';

/**
 * Barre de navigation de l'application
 * @returns {JSX.Element} - Composant JSX
 */
export default function Nav(): JSX.Element {
  const config = useAppConfig();

  return (
    <nav
      className={styles.nav}
      style={{ backgroundColor: config?.theme.colors.dark }}
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
