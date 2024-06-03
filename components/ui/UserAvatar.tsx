'use client';
import { Typography, useTheme } from '@mui/material';
import styles from '../../styles/learnylib.module.css';
import { useMemo } from 'react';
import { getUserInitials } from '../../utils/user';
import UserModel from '../../models/UserModel';

interface UserAvatarProps {
  user: UserModel;
  size?: number;
}

/**
 * Photo de profil de l'utilisateur (ou initiales s'il n'a pas de photo)
 * @returns {JSX.Element} - Composant JSX
 */
export default function UserAvatar({
  size = 50,
  user,
}: UserAvatarProps): JSX.Element {
  const theme = useTheme();

  const avatarStyle = useMemo((): React.CSSProperties => {
    return {
      backgroundColor: user?.pictureUrl ? 'unset' : theme.palette.primary.main,
      backgroundImage: user?.pictureUrl
        ? `url("${user?.pictureUrl}")`
        : undefined,
      width: size,
      height: size,
    };
  }, [theme, user, size]);

  return (
    <div className={styles.userAvatar} style={avatarStyle}>
      {!user.pictureUrl && (
        <Typography sx={{ color: theme.palette.primary.contrastText }}>
          {getUserInitials(user)}
        </Typography>
      )}
    </div>
  );
}
