'use client';
import { Alert, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import SubmitButton from './SubmitButton';
import { useFormState } from 'react-dom';
import resetPasswordAction from '../../actions/resetPasswordAction';
import PasswordInput from './PasswordInput';
import { useParams } from 'next/navigation';
import useGetFormError from '../../hooks/useGetFormError';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import useTranslate from '../../hooks/useTranslate';

/**
 * Formulaire pour la réinitialisation du mot de passe.
 * @returns {JSX.Element} - Composant JSX
 */
export default function ResetPasswordForm(): JSX.Element {
  const [state, action] = useFormState(resetPasswordAction, undefined);

  const t = useTranslate();

  const { token } = useParams();

  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = useHandleInputChange(data, setData);

  const getError = useGetFormError(state);

  if (state?.status === 'success') {
    return <Alert severity="success">{t('ResetPasswordSuccess')}</Alert>;
  }

  return (
    <form action={action}>
      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        <Typography variant="h2">{t('ResetPassword')}</Typography>

        <Typography>{t('ResetPasswordText')}</Typography>

        {getError('form') && <Alert severity="error">{getError('form')}</Alert>}

        <PasswordInput
          name="password"
          label={t('NewPassword')}
          value={data.password}
          onChange={handleChange}
          size="small"
          InputLabelProps={{ shrink: true }}
          inputProps={{ minLength: 8 }}
          required
          autoComplete="new-password"
          error={!!getError('password')}
          helperText={getError('password') || t('PasswordRequirements')}
        />

        <PasswordInput
          name="confirmPassword"
          label={t('ConfirmPassword')}
          value={data.confirmPassword}
          onChange={handleChange}
          size="small"
          required
          error={!!getError('confirmPassword')}
          helperText={getError('confirmPassword')}
        />

        <input name="token" type="hidden" value={token} />

        <SubmitButton>{t('Validate')}</SubmitButton>
      </Stack>
    </form>
  );
}
