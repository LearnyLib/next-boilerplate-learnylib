import { CircularProgress, Stack } from '@mui/material';

/**
 * Affiche un indicateur de chargement
 * @returns {JSX.Element}
 */
export default function Loader(): JSX.Element {
  return (
    <Stack alignItems="center" sx={{ p: 3 }}>
      <CircularProgress />
    </Stack>
  );
}
