'use client';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SubmitButton from './SubmitButton';
import { useFormState } from 'react-dom';
import forgotPasswordAction from '../../actions/forgotPasswordAction';
import useGetFormError from '../../hooks/useGetFormError';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import useTranslate from '../../hooks/useTranslate';

/**
 * Formulaire pour la récupération du mot de passe oublié.
 * @returns {JSX.Element} - Composant JSX
 */
export default function ForgotPasswordForm(): JSX.Element {
  const [state, action] = useFormState(forgotPasswordAction, undefined);

  const t = useTranslate();

  const [data, setData] = useState({
    username: '',
  });

  const handleChange = useHandleInputChange(data, setData);

  const getError = useGetFormError(state);

  if (state?.status === 'success') {
    return (
      <Alert severity="success">
        {t('ForgotPasswordSuccess', { email: data.username })}
      </Alert>
    );
  }

  return (
    <form action={action}>
      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        <Typography variant="h2">{t('ForgotPassword?')}</Typography>

        <Typography>{t('ForgotPasswordText')}</Typography>

        {getError('form') && <Alert severity="error">{getError('form')}</Alert>}

        <TextField
          name="username"
          type="email"
          label={t('EmailAddress')}
          value={data.username}
          onChange={handleChange}
          required
          size="small"
          InputLabelProps={{ shrink: true }}
          autoComplete="username"
          error={!!getError('username')}
          helperText={getError('username')}
        />

        <SubmitButton>{t('Validate')}</SubmitButton>
      </Stack>
    </form>
  );
}
