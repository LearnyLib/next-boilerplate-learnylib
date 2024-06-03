'use client';
import { Stack, Typography } from '@mui/material';
import styles from '../../styles/learnylib.module.css';
import useTranslate from '../../hooks/useTranslate';

/**
 * Ecran d'erreur 404
 * @returns {JSX.Element} - Composant JSX
 */
export default function NotFoundScreen(): JSX.Element {
  const t = useTranslate();

  return (
    <div className={styles.fullScreenCenter}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography variant="h1">404</Typography>

        <Typography>{t('PageNotFound')}</Typography>
      </Stack>
    </div>
  );
}
