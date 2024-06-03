'use client';
import { useMemo } from 'react';
import LightModeType from '../types/LightModeType';
import AppConfigType from '../types/AppConfigType';

/**
 * Hook qui crée un objet de style pour l'arrière plan en fonction du mode d'éclairage
 * @param {AppConfigType} config - Configuration de l'application
 * @param {LightModeType} lightMode - Mode d'éclairage
 * @returns {React.CSSProperties} - Propriétés CSS
 */
export function useBackgroundStyle(
  config: AppConfigType,
  lightMode: LightModeType,
): React.CSSProperties {
  const backgroundStyle = useMemo(() => {
    if (lightMode === 'dark') {
      return {
        backgroundColor: config.theme.colors.dark,
        color: 'white',
      };
    } else {
      return {
        backgroundColor: 'white',
        color: 'rgba(0,0,0,0.9)',
      };
    }
  }, [config, lightMode]);

  return backgroundStyle;
}
