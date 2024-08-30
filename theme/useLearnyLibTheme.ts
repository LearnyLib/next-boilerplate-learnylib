'use client';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';
import LightModeType from '../types/LightModeType';
import AppConfigType from '../types/AppConfigType';

/**
 * Hook qui crée le thème MUI en fonction du mode d'éclairage et de la configuration de l'app
 * @param {AppConfigType} config - Configuration de l'application
 * @param {LightModeType} lightMode - Mode d'éclairage
 * @returns {Theme} - Thème MUI
 */
export function useLearnyLibTheme(
  config: AppConfigType,
  lightMode: LightModeType,
): Theme {
  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette:
          lightMode === 'dark'
            ? config.theme.darkPalette
            : config.theme.lightPalette,

        typography: config.theme.typography,
      }),

    [config, lightMode],
  );

  return theme;
}
