import { Alert, Stack } from '@mui/material';
import useTranslate from '../../hooks/useTranslate';

/**
 * Affiche un message d'erreur générique
 * @returns {JSX.Element}
 */
export default function Error(): JSX.Element {
  const t = useTranslate();
  return (
    <Stack alignItems="center">
      <Alert severity="error">{t('AnErrorOccured')}</Alert>
    </Stack>
  );
}
