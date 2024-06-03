'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';

/**
 * Champ de saisie de mot de passe avec une option pour afficher ou masquer le mot de passe.
 * @param {TextFieldProps} props - Les propriétés à transmettre au composant TextField
 * @returns {JSX.Element} - Composant JSX
 */
export default function PasswordInput(props: TextFieldProps): JSX.Element {
  const [show, setShow] = useState<boolean>(false);

  return (
    <TextField
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShow(!show)}
              edge="end"
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
