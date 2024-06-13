'use client';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Link,
  FormControl,
  FormHelperText,
} from '@mui/material';
import useTranslate from '../../hooks/useTranslate';
import useAppConfig from '../../hooks/useAppConfig';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent) => void;
  error?: string;
}

/**
 * Case à cocher pour accepter les CGV et CGU
 * @returns {JSX.Element} - Composant JSX
 */
export default function TermsCheckbox({
  checked,
  onChange,
  error,
}: TermsCheckboxProps): JSX.Element {
  const t = useTranslate();

  const config = useAppConfig();

  return (
    <FormControl error={error ? true : false}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="acceptTerms"
              checked={checked}
              onChange={onChange}
            />
          }
          label={
            <Typography color="text.secondary" variant="body2">
              {t('IHaveReadAndAccepted')}
              &nbsp;
              <Link
                href={config?.urls?.cgv}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('theTerms')}
              </Link>
              &nbsp;
              {t('and')}
              &nbsp;
              <Link
                href={config?.urls?.cgu}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('theConditions')}
              </Link>
              .
            </Typography>
          }
        />
      </FormGroup>

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
