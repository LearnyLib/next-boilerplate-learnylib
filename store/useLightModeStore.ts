import { create } from 'zustand';
import LightModeType from '../types/LightModeType';

interface LightModeState {
  lightMode: LightModeType | null;
  setLightMode: (lightMode: LightModeType) => void;
}

/**
 * Store Zustand qui sauvegarde le mode d'éclairage
 * @returns {LightModeState} - State manager Zustand
 */
const useLightModeStore = create<LightModeState>()((set) => ({
  lightMode: null,

  setLightMode: (lightMode: LightModeType) =>
    set((state) => ({ ...state, lightMode })),
}));

export default useLightModeStore;
