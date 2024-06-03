'use server';
import './styles/globals.css';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import TemplateProvider from './components/ui/TemplateProvider';
import { getLightModeFromCookies } from './services/lightMode';
import AppConfigType from './types/AppConfigType';
import LightModeType from './types/LightModeType';

interface LearnyLibAppProps {
  children: React.ReactNode;
  config: AppConfigType;
  locale: string;
  messages: AbstractIntlMessages;
}

/**
 * Composant principal et point d'entrée de l'application LearnyLib
 * Il récupère la configuration globale de l'application ainsi que les composants à afficher
 * Il transmet les données de configuration du serveur vers le client
 * @param {Readonly<LearnyLibAppProps>} props - Propriétés du composant
 * @returns {Promise<JSX.Element>} - Promesse retournant un composant JSX
 */
export default async function LearnyLibApp({
  children,
  config,
  locale,
  messages,
}: Readonly<LearnyLibAppProps>): Promise<JSX.Element> {
  // Chargement du mode d'éclairage enregistré dans les cookies
  const lightModeCookie = await getLightModeFromCookies();
  const lightMode: LightModeType =
    lightModeCookie || config.theme.defaultLightMode;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppRouterCacheProvider>
        <TemplateProvider lightMode={lightMode} config={config}>
          {children}
        </TemplateProvider>
      </AppRouterCacheProvider>
    </NextIntlClientProvider>
  );
}
