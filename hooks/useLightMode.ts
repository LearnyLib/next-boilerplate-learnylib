'use client';
import useLightModeStore from '../store/useLightModeStore';
import LightModeType from '../types/LightModeType';

/**
 * Hook client-side pour récupérer le mode d'éclairage
 * @returns {LightModeType|null}
 */
export default function useLightMode(): LightModeType | null {
  const { lightMode } = useLightModeStore();

  return lightMode;
}
