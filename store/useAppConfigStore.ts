import { create } from 'zustand';
import AppConfigType from '../types/AppConfigType';

interface AppConfigState {
  config: AppConfigType | null;
  setConfig: (config: AppConfigType) => void;
}

/**
 * Store Zustand qui sauvegarde la configuration de l'application
 * @returns {AppConfigState} - State manager Zustand
 */
const useAppConfigStore = create<AppConfigState>()((set) => ({
  config: null,

  setConfig: (config: AppConfigType) => set((state) => ({ ...state, config })),
}));

export default useAppConfigStore;
