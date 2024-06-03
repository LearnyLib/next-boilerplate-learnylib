import { CircularProgress, Stack } from '@mui/material';

export default function Loader(): JSX.Element {
  return (
    <Stack alignItems="center" sx={{ p: 3 }}>
      <CircularProgress />
    </Stack>
  );
}
