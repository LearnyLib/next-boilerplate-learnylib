import ColorsType from './ColorsType';
import { NextFont } from 'next/dist/compiled/@next/font';
import LightModeType from './LightModeType';
import LogoType from './LogoType';

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
     * Palette de couleurs de l'application
     * Ces couleurs sont utilisées dans le thème MUI
     */
    colors: ColorsType;

    /**
     * Polices utilisées dans l'application
     * Ces polices sont utilisées dans le thème MUI
     */
    fonts: {
      main: NextFont; // Police principale
      headline: NextFont; // Police utilisée pour les gros titres
    };

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
