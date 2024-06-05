import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import Modal from './Modal';
import useTranslate from '@/lib/learnylib/hooks/useTranslate';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /**
   * Couleur des boutons
   */
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

/**
 * Composant permettant d'afficher une popup de type "confirm"
 * Inspirée de la fonction native window.confirm
 * @returns {JSX.Element}
 */
export default function ConfirmModal({
  children,
  open,
  onClose,
  onConfirm,
  color = 'primary',
}: ModalProps): JSX.Element {
  const t = useTranslate();
  return (
    <Modal open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={color}>
          {t('Cancel')}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={color}>
          {t('Confirm')}
        </Button>
      </DialogActions>
    </Modal>
  );
}
