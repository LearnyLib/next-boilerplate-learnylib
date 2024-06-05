import { Dialog, DialogTitle } from '@mui/material';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * Composant permettant d'afficher des popups et boites de dialogues
 * @returns {JSX.Element}
 */
export default function Modal({
  children,
  open,
  onClose,
  title,
}: ModalProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {children}
    </Dialog>
  );
}
