'use client';
import { useCallback } from 'react';
import fr from '../translations/fr.json';
import en from '../translations/en.json';
import es from '../translations/es.json';
import it from '../translations/it.json';
import de from '../translations/de.json';
import { useLocale } from 'next-intl';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = { fr, en, es, it, de };

type Variables = { [key: string]: string | number };

type TranslateFn = (translationKey: string, variables?: Variables) => string;

/**
 * Hook utilisé pour la traduction des textes de la librairie
 * @returns {TranslateFn} - Fonction qui récupère la traduction d'un texte à partir de sa clé d'identification
 */
export default function useTranslate(): TranslateFn {
  const locale = useLocale();

  const t = useCallback(
    (translationKey: string, variables?: Variables): string => {
      const languagePack = translations[locale];

      let translatedText = languagePack[translationKey] || translationKey;

      if (variables) {
        Object.keys(variables).forEach((key) => {
          translatedText = translatedText.replace(
            new RegExp(`{${key}}`, 'g'),
            (variables[key] || '').toString(),
          );
        });
      }

      if (translatedText === translationKey) {
        console.warn(
          `Translation for '${translationKey}' not found in selected (${locale}) or default language.`,
        );
      }

      return translatedText;
    },
    [locale],
  );

  return t;
}
