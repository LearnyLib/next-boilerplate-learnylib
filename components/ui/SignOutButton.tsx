'use client';
import signOutAction from '../../actions/signOutAction';
import styles from '../../styles/learnylib.module.css';
import { Logout } from '@mui/icons-material';

/**
 * Bouton de déconnexion de l'utilisateur
 * @returns {JSX.Element} - Composant JSX
 */
export default function SignOutButton(): JSX.Element {
  return (
    <button
      className={styles.actionIcon}
      onClick={async () => {
        await signOutAction();
      }}
    >
      <Logout fontSize="small" />
    </button>
  );
}
