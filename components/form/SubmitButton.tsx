'use client';
import { LoadingButton } from '@mui/lab';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
}

/**
 * Bouton de soumission de formulaire
 * @returns {JSX.Element} - Composant JSX
 */
export default function SubmitButton({
  children,
}: SubmitButtonProps): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <LoadingButton type="submit" variant="contained" loading={pending}>
      {children}
    </LoadingButton>
  );
}
