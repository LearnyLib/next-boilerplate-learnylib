import { TypographyOptions } from '@mui/material/styles/createTypography';
import LightModeType from './LightModeType';
import LogoType from './LogoType';
import { PaletteOptions } from '@mui/material';

/**
 * Configuration globale de l'application
 */
export default interface AppConfigType {
  /**
   * Nom de l'application
   */
  name: string;

  /**
   * Thème graphique
   */
  theme: {
    /**
     * Typographie MUI
     */
    typography: TypographyOptions;

    /**
     * Palette de couleurs MUI en "light mode"
     */
    lightPalette: PaletteOptions;

    /**
     * Palette de couleurs MUI en "dark mode"
     */
    darkPalette: PaletteOptions;

    /**
     * Logo de l'application
     * Il est affiché en haut de la barre latérale de navigation
     */
    logo: LogoType;

    /**
     * Mode d'éclairage par défaut
     * light | dark
     */
    defaultLightMode: LightModeType;
  };

  /**
   * Liens et URLs de redirection personnalisés
   */
  urls?: {
    /**
     * Conditions générales de vente
     */
    cgv?: string;

    /**
     * Conditions générales d'utilisation
     */
    cgu?: string;

    /**
     * URL de redirection après inscription
     */
    signUpSuccess?: string;

    /**
     * URL de redirection après connexion
     * Ne s'applique pas si le paramètre callbackUrl est présent dans l'URL
     */
    signInSuccess?: string;
  };
}
