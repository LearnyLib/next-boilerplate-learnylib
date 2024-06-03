'use client';
import { Stack, Typography } from '@mui/material';
import SignOutButton from './SignOutButton';
import UserAvatar from './UserAvatar';
import useAuthUser from '../../hooks/useAuthUser';

/**
 * Photo de profil de l'utilisateur (ou initiales) suivies de son nom et du bouton de déconnexion
 * @returns {JSX.Element} - Composant JSX
 */
export default function UserWidget(): JSX.Element {
  const user = useAuthUser();

  if (!user) {
    return <div></div>;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <UserAvatar user={user} size={48} />

      <Typography variant="body2">{user.name}</Typography>

      <SignOutButton />
    </Stack>
  );
}
