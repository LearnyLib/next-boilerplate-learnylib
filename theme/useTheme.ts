'use client';
import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { PaletteOptions, Theme } from '@mui/material';
import LightModeType from '../types/LightModeType';
import AppConfigType from '../types/AppConfigType';

/**
 * Hook qui crée le thème MUI n fonction du mode d'éclairage et de la config
 * @param {AppConfigType} config - Configuration de l'application
 * @param {LightModeType} lightMode - Mode d'éclairage
 * @returns {Theme} - Thème MUI
 */
export function useTheme(
  config: AppConfigType,
  lightMode: LightModeType,
): Theme {
  let palette: PaletteOptions;

  if (lightMode === 'dark') {
    palette = { mode: 'dark' };
  } else {
    palette = {
      primary: { main: config.theme.colors.primary },
      secondary: { main: config.theme.colors.secondary },
      error: { main: config.theme.colors.error },
      warning: { main: config.theme.colors.warning },
      info: { main: config.theme.colors.info },
      success: { main: config.theme.colors.success },
    };
  }

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette,

        typography: {
          fontFamily: config.theme.fonts.main.style.fontFamily,

          h1: {
            fontFamily: config.theme.fonts.headline.style.fontFamily,
            fontSize: '2.8rem',
          },

          h2: {
            fontFamily: config.theme.fonts.headline.style.fontFamily,
            fontSize: '2.5rem',
          },

          h3: {
            fontFamily: config.theme.fonts.main.style.fontFamily,
            fontSize: '2.2rem',
          },

          h4: {
            fontFamily: config.theme.fonts.main.style.fontFamily,
            fontSize: '1.9rem',
          },

          h5: {
            fontFamily: config.theme.fonts.main.style.fontFamily,
            fontSize: '1.6rem',
          },

          h6: {
            fontFamily: config.theme.fonts.main.style.fontFamily,
            fontSize: '1.3rem',
          },
        },
      }),
    [config, palette],
  );

  return theme;
}
