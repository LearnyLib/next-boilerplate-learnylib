import { ReactElement } from 'react';
import ToastSeverityType from './ToastSeverityType';

/**
 * Fonction permettant d'afficher un Toast (notification éphémère)
 */
type SetToastType = (
  message: string,
  severity?: ToastSeverityType,
  duration?: number,
  icon?: ReactElement,
) => void;

export default SetToastType;
