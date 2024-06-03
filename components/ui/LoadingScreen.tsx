'use client';
import { CircularProgress } from '@mui/material';
import styles from '../../styles/learnylib.module.css';

/**
 * Ecran de chargement de l'application
 * @returns {JSX.Element} - Composant JSX
 */
export default function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.fullScreenCenter}>
      <CircularProgress />
    </div>
  );
}
