import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import Modal from './Modal';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

/**
 * Composant permettant d'afficher une popup de type "alert"
 * Inspirée de la fonction native window.alert
 * @returns {JSX.Element}
 */
export default function AlertModal({
  children,
  open,
  onClose,
}: ModalProps): JSX.Element {
  return (
    <Modal open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Modal>
  );
}
