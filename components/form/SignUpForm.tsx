'use client';
import { Alert, Stack, TextField, Typography, Link as A } from '@mui/material';
import { useEffect, useState } from 'react';
import PasswordInput from './PasswordInput';
import TermsCheckbox from './TermsCheckbox';
import signUpAction from '../../actions/signUpAction';
import { useFormState } from 'react-dom';
import useToastStore from '../../store/useToastStore';
import SubmitButton from './SubmitButton';
import PhoneInput from './PhoneInput';
import CallbackUrlInput from './CallbackUrlInput';
import useGetFormError from '../../hooks/useGetFormError';
import useHandleInputChange from '../../hooks/useHandleInputChange';
import useTranslate from '../../hooks/useTranslate';
import useAppConfig from '../../hooks/useAppConfig';
import useQueryString from '../../hooks/useQueryString';

/**
 * Formulaire pour l'inscription.
 * @returns {JSX.Element} - Composant JSX
 */
export default function SignUpForm(): JSX.Element {
  const query = useQueryString();

  const [state, action] = useFormState(signUpAction, undefined);

  const config = useAppConfig();

  // URL de redirection suite à l'inscription
  const successUrl = config?.urls?.signUpSuccess;

  const t = useTranslate();

  const { setToast } = useToastStore();

  useEffect(() => {
    if (state?.status === 'success') {
      setToast(t('SignUpSuccess'), 'success');
    }
  }, [state, setToast, t]);

  const [data, setData] = useState({ ...emptyData });

  const handleChange = useHandleInputChange(data, setData);

  const getError = useGetFormError(state);

  const handleTermsToggle = () => {
    setData({ ...data, acceptTerms: !data.acceptTerms });
  };

  return (
    <form action={action}>
      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        <Typography variant="h2">
          {t('SignUpTitle', { appName: config?.name || '' })}
        </Typography>

        {getError('form') && <Alert severity="error">{getError('form')}</Alert>}

        <TextField
          name="lastName"
          label={t('LastName')}
          value={data.lastName}
          onChange={handleChange}
          size="small"
          required
          inputProps={{ minLength: 2, maxLength: 200 }}
          error={!!getError('lastName')}
          helperText={getError('lastName')}
        />

        <TextField
          name="firstName"
          label={t('FirstName')}
          value={data.firstName}
          onChange={handleChange}
          size="small"
          required
          inputProps={{ minLength: 2, maxLength: 200 }}
          error={!!getError('firstName')}
          helperText={getError('firstName')}
        />

        <TextField
          type="email"
          name="email"
          label={t('EmailAddress')}
          value={data.email}
          onChange={handleChange}
          size="small"
          InputLabelProps={{ shrink: true }}
          required
          inputProps={{ maxLength: 100 }}
          error={!!getError('email')}
          helperText={getError('email')}
          autoComplete="username"
        />

        <PhoneInput
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          size="small"
        />

        <PasswordInput
          name="password"
          label={t('Password')}
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

        <TermsCheckbox
          checked={data.acceptTerms}
          onChange={handleTermsToggle}
          error={getError('acceptTerms')}
        />

        {successUrl && (
          <input type="hidden" name="successUrl" value={successUrl} />
        )}

        <CallbackUrlInput />

        <SubmitButton>{t('SignUpAction')}</SubmitButton>

        <Typography align="center">
          {t('AlreadyHaveAccount')}
          &nbsp;
          <A href={`/auth/sign-in${query}`} sx={{ cursor: 'pointer' }}>
            {t('SignIn')}
          </A>
        </Typography>
      </Stack>
    </form>
  );
}

const emptyData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '+33',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};
