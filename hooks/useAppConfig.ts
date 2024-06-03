'use client';
import useAppConfigStore from '../store/useAppConfigStore';
import AppConfigType from '../types/AppConfigType';

/**
 * Hook client-side pour récupérer la configuration de l'application
 * @returns {AppConfigType|null}
 */
export default function useAppConfig(): AppConfigType | null {
  const { config } = useAppConfigStore();

  return config;
}
