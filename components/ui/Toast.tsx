'use client';
import { Alert, Snackbar } from '@mui/material';
import useToastStore from '../../store/useToastStore';

/**
 * Notification éphémère apparaissant en bas de l'écran
 * @returns {JSX.Element} - Composant JSX
 */
export default function Toast(): JSX.Element {
  const { message, severity, duration, icon, open, closeToast } =
    useToastStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={closeToast}
        severity={severity}
        variant="filled"
        icon={icon}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
