'use client';
import { Typography } from '@mui/material';
import styles from '../../styles/learnylib.module.css';
import useTranslate from '../../hooks/useTranslate';

/**
 * Message d'erreur qui apparaît au centre de l'écran
 * @returns {JSX.Element} - Composant JSX
 */
export default function ErrorScreen(): JSX.Element {
  const t = useTranslate();

  return (
    <div className={styles.fullScreenCenter}>
      <Typography>{t('AnErrorOccured')}</Typography>
    </div>
  );
}
