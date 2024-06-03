'use client';
import { Typography } from '@mui/material';
import styles from '../../styles/learnylib.module.css';
import MenuOption from './MenuOption';
import MenuGroupType from '../../types/MenuGroupType';
import { useTranslations } from 'next-intl';

interface MenuGroupProps {
  group: MenuGroupType;
}

/**
 * Groupe d'options du menu
 * @returns {JSX.Element} - Composant JSX
 */
export default function MenuGroup({ group }: MenuGroupProps): JSX.Element {
  const t = useTranslations();

  return (
    <div className={styles.menuGroup}>
      <div className={styles.menuGroupTitle}>
        <Typography>
          <b>{t(group.label).toUpperCase()}</b>
        </Typography>
      </div>

      {group.options
        .filter((option) => !option.hide)
        .map((option, index) => (
          <MenuOption option={option} key={index} />
        ))}
    </div>
  );
}
