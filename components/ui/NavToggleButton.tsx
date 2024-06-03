'use client';
import styles from '../../styles/learnylib.module.css';
import { Close, Menu } from '@mui/icons-material';
import useTemplateStore from '../../store/useTemplateStore';
import useAppConfig from '../../hooks/useAppConfig';

/**
 * Bouton permettant d'afficher ou masquer le menu de navigation sur mobile
 * @returns {JSX.Element} - Composant JSX
 */
export default function NavToggleButton(): JSX.Element {
  const config = useAppConfig();

  const { showSmallScreenNav, setShowSmallScreenNav } = useTemplateStore();

  return (
    <button
      className={styles.navToggleButton}
      style={{ backgroundColor: config?.theme.colors.dark }}
      onClick={() => setShowSmallScreenNav(!showSmallScreenNav)}
    >
      {showSmallScreenNav ? <Close /> : <Menu />}
    </button>
  );
}
