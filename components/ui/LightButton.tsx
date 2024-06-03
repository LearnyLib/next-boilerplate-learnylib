'use client';
import { DarkMode, LightMode } from '@mui/icons-material';
import styles from '../../styles/learnylib.module.css';
import LightModeType from '../../types/LightModeType';
import { usePathname } from 'next/navigation';
import updateLightModeAction from '../../actions/updateLightModeAction';
import useLightMode from '../../hooks/useLightMode';

/**
 * Bouton pour changer de mode d'éclairage (dark/light)
 * @returns {JSX.Element} - Composant JSX
 */
export default function LightButton(): JSX.Element {
  const lightMode = useLightMode();

  const pathname = usePathname();

  const handleSwitch = async () => {
    let newLightMode: LightModeType = lightMode === 'light' ? 'dark' : 'light';
    await updateLightModeAction(newLightMode, pathname);
  };

  return (
    <div className={styles.actionIcon} onClick={handleSwitch}>
      {lightMode === 'dark' ? (
        <DarkMode fontSize="small" />
      ) : (
        <LightMode fontSize="small" />
      )}
    </div>
  );
}
