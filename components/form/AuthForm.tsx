'use client';
import { Button, Stack, Typography } from '@mui/material';
import useTranslate from '../../hooks/useTranslate';
import useAppConfig from '../../hooks/useAppConfig';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * Composant qui permet à l'utilisateur de choisir entre s'inscrire ou se connecter.
 * @returns {JSX.Element} - Composant JSX
 */
export default function AuthForm(): JSX.Element {
  const searchParams = useSearchParams();

  const query = useMemo(
    () =>
      searchParams.has('callbackUrl')
        ? `?callbackUrl=${searchParams.get('callbackUrl')}`
        : '',
    [searchParams],
  );

  const config = useAppConfig();

  const t = useTranslate();

  return (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <Typography variant="h2" align="center">
        {t('WelcomeMessage', { appName: config?.name || '' })}
      </Typography>

      <Typography align="center">{t('ThisAppIsALearnyLibService')}</Typography>

      <Typography align="center">{t('DoNotHaveAccount')}</Typography>

      <Button
        variant="contained"
        size="large"
        component={Link}
        href={`/auth/sign-up${query}`}
      >
        {t('SignUpAction')}
      </Button>

      <Typography align="center">{t('AlreadyHaveAccount')}</Typography>

      <Button
        variant="outlined"
        size="large"
        component={Link}
        href={`/auth/sign-in${query}`}
      >
        {t('SignInAction')}
      </Button>
    </Stack>
  );
}
