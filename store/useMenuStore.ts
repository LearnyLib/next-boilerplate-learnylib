import { create } from 'zustand';
import MenuType from '../types/MenuType';

interface MenuState {
  menu: MenuType;
  setMenu: (menu: MenuType) => void;
}

/**
 * Store Zustand qui sauvegarde les données de l'utilisateur
 * @returns {MenuState} - State manager Zustand
 */
const useMenuStore = create<MenuState>()((set) => ({
  menu: [],

  setMenu: (menu: MenuType) => set((state) => ({ ...state, menu })),
}));

export default useMenuStore;
