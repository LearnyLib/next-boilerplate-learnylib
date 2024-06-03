'use client';
import MenuOptionType from '../../types/MenuOptionType';
import { Collapse, Typography } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/learnylib.module.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuSubOption from './MenuSubOption';
import { ReactNode, useEffect, useState } from 'react';
import useIsMenuPathActive from '../../hooks/useIsMenuPathActive';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface MenuLinkProps {
  option: MenuOptionType;
}

/**
 * Option du menu
 * @returns {JSX.Element} - Composant JSX
 */
export default function MenuOption({ option }: MenuLinkProps): JSX.Element {
  const t = useTranslations();

  // Afficher ou non les sous-options
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  // Par défaut, on affiche les sous-options si le chemin de l'option correspond au début du chemin courant
  useEffect(() => {
    setOpen(pathname.startsWith(option.path));
  }, [option, pathname]);

  // L'option a-t-elle des sous-options
  const hasSubOptions =
    Array.isArray(option.subOptions) && option.subOptions.length > 0;

  // L'option est elle active ?
  const isMenuPathActive = useIsMenuPathActive();
  const isActive = hasSubOptions ? false : isMenuPathActive(option.path);

  // Afficher ou masquer les sous-options
  const toggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOpen(!open);
  };

  const optionContent: ReactNode = (
    <div className={isActive ? styles.menuOptionActive : styles.menuOption}>
      <div className={styles.menuOptionLabel}>
        {option.icon}

        <Typography>{t(option.label)}</Typography>
      </div>

      {hasSubOptions && <div>{open ? <ExpandLess /> : <ExpandMore />}</div>}
    </div>
  );

  return (
    <>
      {hasSubOptions ? (
        <div onClick={toggle}>{optionContent}</div>
      ) : (
        <Link href={option.path}>{optionContent}</Link>
      )}

      <div>
        <Collapse in={open} mountOnEnter unmountOnExit>
          {option.subOptions &&
            option.subOptions
              .filter((subOption) => !subOption.hide)
              .map((subOption, index) => (
                <MenuSubOption subOption={subOption} key={index} />
              ))}
        </Collapse>
      </div>
    </>
  );
}
