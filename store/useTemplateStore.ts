'use client';
import { create } from 'zustand';

interface TemplateState {
  isSmallScreen: boolean;
  setIsSmallScreen: (isSmallScreen: boolean) => void;
  showSmallScreenNav: boolean;
  setShowSmallScreenNav: (showSmallScreenNav: boolean) => void;
}

/**
 * Store Zustand qui gère l'affichage conditionnel du MenuTemplate en mode Responsive
 * Le Nav est masqué par défaut sur les petits écrans
 * Il peut être affiché grâce à la propriété showSmallScreenNav
 * @returns {TemplateState} - State manager Zustand
 */
const useTemplateStore = create<TemplateState>()((set) => ({
  isSmallScreen: false,

  setIsSmallScreen: (isSmallScreen: boolean) =>
    set((state) => ({ ...state, isSmallScreen })),

  showSmallScreenNav: false,

  setShowSmallScreenNav: (showSmallScreenNav: boolean) =>
    set((state) => ({ ...state, showSmallScreenNav })),
}));

export default useTemplateStore;
