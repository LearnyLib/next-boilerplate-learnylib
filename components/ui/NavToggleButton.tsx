'use client';
import styles from '../../styles/learnylib.module.css';
import { Close, Menu } from '@mui/icons-material';
import useTemplateStore from '../../store/useTemplateStore';

/**
 * Bouton permettant d'afficher ou masquer le menu de navigation sur mobile
 * @returns {JSX.Element} - Composant JSX
 */
export default function NavToggleButton(): JSX.Element {
  const { showSmallScreenNav, setShowSmallScreenNav } = useTemplateStore();

  return (
    <button
      className={styles.navToggleButton}
      onClick={() => setShowSmallScreenNav(!showSmallScreenNav)}
    >
      {showSmallScreenNav ? (
        <Close fontSize="large" />
      ) : (
        <Menu fontSize="large" />
      )}
    </button>
  );
}
