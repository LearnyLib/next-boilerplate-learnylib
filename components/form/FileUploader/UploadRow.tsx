'use client';
import useTranslate from '../../../hooks/useTranslate';
import deleteFileByUrl from '../../../services/cellar/deleteFileByUrl';
import { UploadType } from '../../../types';
import getFileNameFromUrl from '../../../utils/getFileNameFromUrl';
import {
  Close,
  CloudDone,
  CloudOff,
  CloudQueue,
  Delete,
  Download,
  ErrorOutline,
} from '@mui/icons-material';
import {
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo } from 'react';

interface UploadRowProps {
  upload: UploadType;
  /**
   * Annulation de l'upload ou suppression du fichier
   * @returns {void}
   */
  onRemove: () => void;
}

/**
 * Fichier à uploader
 * @param {FileRowProps} props
 * @returns {JSX.Element}
 */
export default function UploadRow({
  upload,
  onRemove,
}: UploadRowProps): JSX.Element {
  const t = useTranslate();

  const handleDelete = async () => {
    onRemove();

    if (upload.url) {
      try {
        await deleteFileByUrl(upload.url);
      } catch {}
    }
  };

  const fileName: string = useMemo(() => {
    return (
      upload.file?.name || (upload.url ? getFileNameFromUrl(upload.url) : '')
    );
  }, [upload]);

  return (
    <Paper variant="outlined">
      {upload.status === 'uploading' && <LinearProgress />}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ p: 1.5 }}
        flexWrap="wrap"
      >
        {upload.status === 'uploading' && <CloudQueue color="primary" />}

        {upload.status === 'canceled' && <CloudOff color="disabled" />}

        {upload.status === 'success' && <CloudDone color="primary" />}

        {upload.status === 'error' && <ErrorOutline color="error" />}

        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {fileName}
        </Typography>

        {upload.error && (
          <Typography variant="body2" color="error">
            {t(upload.error)}
          </Typography>
        )}

        {['uploading', 'error'].includes(upload.status) && (
          <IconButton onClick={onRemove}>
            <Close />
          </IconButton>
        )}

        {upload.url && (
          <Stack direction="row">
            <IconButton
              href={upload.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              size="small"
            >
              <Download />
            </IconButton>

            <IconButton size="small" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
