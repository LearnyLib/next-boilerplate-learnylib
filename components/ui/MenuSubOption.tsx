'use client';
import styles from '../../styles/learnylib.module.css';
import { Typography } from '@mui/material';
import MenuSubOptionType from '../../types/MenuSubOptionType';
import Link from 'next/link';
import useIsMenuPathActive from '../../hooks/useIsMenuPathActive';
import { useTranslations } from 'next-intl';
import useTemplateStore from '../../store/useTemplateStore';

interface MenuSubOptionProps {
  subOption: MenuSubOptionType;
}

/**
 * Sous-option du menu
 * @returns {JSX.Element} - Composant JSX
 */
export default function MenuSubOption({
  subOption,
}: MenuSubOptionProps): JSX.Element {
  const t = useTranslations();

  const { setShowSmallScreenNav } = useTemplateStore();

  // La sous-option est-elle active ?
  const isMenuPathActive = useIsMenuPathActive();
  const isActive = isMenuPathActive(subOption.path);

  return (
    <Link
      href={subOption.path}
      className={isActive ? styles.menuSubOptionActive : styles.menuSubOption}
      onClick={() => setShowSmallScreenNav(false)}
    >
      <Typography>{t(subOption.label)}</Typography>
    </Link>
  );
}
