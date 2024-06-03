import { ReactElement } from 'react';
import { create } from 'zustand';
import ToastSeverityType from '../types/ToastSeverityType';
import SetToastType from '../types/SetToastType';

interface ToastState {
  message: string;
  severity: ToastSeverityType;
  duration: number;
  icon?: ReactElement;
  open: boolean;
  setToast: SetToastType;
  closeToast: () => void;
}

const defaultSeverity: ToastSeverityType = 'success';

const defaultDuration: number = 4000;

/**
 * Store Zustand qui gère l'affichage des toats (notifications éphémères en bas de l'écran)
 * @returns {ToastState} - State manager Zustand
 */
const useToastStore = create<ToastState>()((set) => ({
  message: '',
  severity: defaultSeverity,
  duration: defaultDuration,
  open: false,

  setToast: (
    message: string,
    severity?: ToastSeverityType,
    duration?: number,
    icon?: ReactElement,
  ) =>
    set((state) => {
      return {
        ...state,
        message: message,
        severity: severity || defaultSeverity,
        duration: duration || defaultDuration,
        icon: icon,
        open: true,
      };
    }),

  closeToast: () => set((state) => ({ ...state, open: false })),
}));

export default useToastStore;
