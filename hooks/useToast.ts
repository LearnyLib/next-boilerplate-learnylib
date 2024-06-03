import { ReactElement, useCallback } from 'react';
import SetToastType from '../types/SetToastType';
import ToastSeverityType from '../types/ToastSeverityType';
import useToastStore from '../store/useToastStore';

export default function useToast(): SetToastType {
  const { setToast } = useToastStore();

  const showToast = useCallback(
    (
      message: string,
      severity?: ToastSeverityType,
      duration?: number,
      icon?: ReactElement,
    ) => {
      setToast(message, severity, duration, icon);
    },
    [setToast],
  );

  return showToast;
}
