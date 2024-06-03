'use client';
import { Alert, Stack, TextField, Typography, Link as A } from '@mui/material';
import { useState } from 'react';
import PasswordInput from './PasswordInput';
import Link from 'next/link';
import signInAction from '../../actions/signInAction';
import SubmitButton from './SubmitButton';
import { useFormState } from 'react-dom';
import CallbackUrlInput from './CallbackUrlInput';
import useGetFormError from '../../hooks/useGetFormError';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import useTranslate from '../../hooks/useTranslate';
import useAppConfig from '../../hooks/useAppConfig';

/**
 * Formulaire pour la connexion de l'utilisateur
 * @returns {JSX.Element} - Composant JSX
 */
export default function SignInForm(): JSX.Element {
  const [state, action] = useFormState(signInAction, undefined);

  const config = useAppConfig();

  const t = useTranslate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = useHandleInputChange(credentials, setCredentials);

  const getError = useGetFormError(state);

  return (
    <form action={action}>
      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        <Typography variant="h2">
          {t('SignInTitle', { appName: config?.name || '' })}
        </Typography>

        {getError('form') && <Alert severity="error">{getError('form')}</Alert>}

        <TextField
          name="username"
          type="email"
          label={t('EmailAddress')}
          value={credentials.username}
          onChange={handleChange}
          required
          size="small"
          InputLabelProps={{ shrink: true }}
          autoComplete="username"
          error={!!getError('username')}
          helperText={getError('username')}
        />

        <Stack spacing={1}>
          <PasswordInput
            name="password"
            label={t('Password')}
            value={credentials.password}
            onChange={handleChange}
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            autoComplete="current-password"
            error={!!getError('password')}
            helperText={getError('password')}
          />

          <Link href="/auth/password/forgot">
            <Typography color="text.secondary" variant="body2">
              <u>{t('ForgotPassword?')}</u>
            </Typography>
          </Link>
        </Stack>

        <CallbackUrlInput />

        <SubmitButton>{t('SignInAction')}</SubmitButton>

        <Typography align="center">
          {t('DoNotHaveAccount')}
          &nbsp;
          <A href="/auth/sign-up" sx={{ cursor: 'pointer' }}>
            {t('SignUp')}
          </A>
        </Typography>
      </Stack>
    </form>
  );
}
