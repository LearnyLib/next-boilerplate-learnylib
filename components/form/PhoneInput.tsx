'use client';
import countries from '../../utils/countries';
import {
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import CountryType from '../../types/CountryType';
import CountryFlag from '../ui/CountryFlag';
import useTranslate from '../../hooks/useTranslate';

interface PhoneInputProps {
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  size?: 'small' | 'medium';
  required?: boolean;
}

interface PhoneInfosType {
  dial: string;
  number: string;
  country: CountryType | undefined;
}

/**
 * Champ de saisie d'un numéro de téléphone avec l'indicatif du pays.
 * @param {PhoneInputProps} props - Les propriétés du composant PhoneInput.
 * @returns {JSX.Element} - Composant JSX
 */
export default function PhoneInput({
  name,
  value,
  onChange,
  size = 'small',
  required = false,
}: PhoneInputProps): JSX.Element {
  const t = useTranslate();

  // Pays correspondant à l'indicatif
  const [country, setCountry] = useState<CountryType | undefined>();

  // Numéro de téléphone sans l'indicatif
  const [number, setNumber] = useState<string>('');

  // Numéro de téléphone complet avec l'indicatif
  const phoneValue = useMemo(
    () => (country?.dial || '') + number,
    [country, number],
  );

  // Extraction du code pays et du numéro sans indicatif à partir du numéro de téléphone complet
  useEffect(() => {
    if (value.length > 1) {
      const infos: PhoneInfosType = getPhoneInfos(value);
      setCountry(infos.country);
      setNumber(infos.number);
    }
  }, [value]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCountry = countries.find((c) => c.code === event.target.value);
    setCountry(newCountry);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = formatOnlyDigits(event.target.value);
    setNumber(newNumber);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        select
        name={name + 'Country'}
        value={country?.code || ''}
        onChange={handleCountryChange}
        size={size}
        SelectProps={{
          renderValue: (selectedValue: any) =>
            selectedValue ? <CountryFlag code={selectedValue} /> : '',
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ width: 70 }}
        required={required}
      >
        {countries
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map((country: CountryType) => (
            <MenuItem value={country.code} key={country.code}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CountryFlag code={country.code} />
                <Typography>{country.name}</Typography>
                <Typography color="text.secondary">{country.dial}</Typography>
              </Stack>
            </MenuItem>
          ))}
      </TextField>

      <TextField
        label={t('Phone')}
        name={name + 'Number'}
        value={number}
        onChange={handleNumberChange}
        sx={{ flex: 1 }}
        size={size}
        required={required}
        inputProps={{ minLength: 6, maxLength: 15, pattern: '\\d*' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {country?.dial || '+'}
            </InputAdornment>
          ),
        }}
      />

      <input type="hidden" name={name} value={phoneValue} onChange={onChange} />
    </Stack>
  );
}

/**
 * Fonction pour ne conserver que les chiffres d'une chaîne.
 * @param {string} value - La chaîne à filtrer.
 * @returns {string} - La chaîne ne contenant que des chiffres.
 */
function formatOnlyDigits(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits ? parseInt(digits, 10).toString() : '';
}

/**
 * Fonction pour extraire le code pays et le numéro de téléphone à partir d'une chaîne.
 * @param {string} phone - Le numéro de téléphone complet.
 * @returns {PhoneInfosType} - Un objet contenant le code pays, le numéro de téléphone sans indicatif, et le pays correspondant.
 */
function getPhoneInfos(phone: string): PhoneInfosType {
  const country = countries
    .sort((a, b) => b.dial.length - a.dial.length)
    .find((country) => phone.startsWith(country.dial));

  const dial = country?.dial || '';

  const number = formatOnlyDigits(phone.substring(dial.length, phone.length));

  return { dial, number, country };
}
