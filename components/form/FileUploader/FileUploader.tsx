'use client';
import useTranslate from '../../../hooks/useTranslate';
import { CloudUpload } from '@mui/icons-material';
import {
  Alert,
  Button,
  Stack,
  Typography,
  useTheme,
  Link as A,
} from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import UploadType from '../../../types/UploadType';
import UploadRow from './UploadRow';
import { uploadFile } from '../../../services';
import getFileExtension from '../../../utils/getFileExtension';

interface FileInputProps {
  label?: string;

  /**
   * Liste des URLs des fichiers
   */
  value: string[];

  /**
   * Retoune la liste des URLs des fichiers uploadés
   * @param {string} urls
   * @returns {void}
   */
  onChange: (urls: string[]) => void;

  /**
   * Nombre de fichier maximal à uploader
   */
  max?: number;

  /**
   * Extensions acceptées
   */
  extensions?: string[];
}

/**
 * Composant permettant l'upload d'un ou plusieurs fichiers
 * Les fichiers sont stockés sur Clever Cloud Cellar S3
 * @param {FileInputProps} props
 * @returns {JSX.Element}
 */
export default function FileUploader({
  label,
  value,
  onChange,
  max = 1,
  extensions,
}: FileInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [active, setActive] = useState<boolean>(false);

  const [uploads, setUploads] = useState<UploadType[]>([]);

  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();

  const t = useTranslate();

  const sx = useMemo(() => {
    return {
      border: `dashed 2px ${active ? theme.palette.primary.main : 'lightgrey'}`,
      backgroundColor: active ? 'rgba(0,0,0,0.02)' : 'transparent',
      padding: 1,
    };
  }, [active, theme]);

  // Gestion des fichiers chargés dans l'input ou déposés par glisser-déposer
  const handleFiles = async (fileList: FileList): Promise<void> => {
    // Reset de l'erreur en cours
    setError(null);

    // On vérifie la validité des fichiers
    if (!fileList || fileList.length === 0) return;

    // On contôle que le nombre max de fichier ne sera pas dépassé
    const filesCount: number = fileList.length + value.length;

    if (filesCount > max) {
      showError('MaxFilesExceeded');
      return;
    }

    // On contrôle les extensions des fichiers
    if (Array.isArray(extensions)) {
      const unacceptedExtensions = Array.from(fileList)
        .map((file: File) => getFileExtension(file.name))
        .filter((ext: string) => !extensions.includes(ext));

      if (unacceptedExtensions.length > 0) {
        showError(
          `UnacceptedExtension${unacceptedExtensions.length > 1 ? 's' : ''}`,
          { ext: unacceptedExtensions.join(', ') },
        );
        return;
      }
    }

    // On crée un tableau d'objets "Upload" contenant les fichiers à uploader
    let newUploads: UploadType[] = [];

    Array.from(fileList).forEach((file: File) => {
      // On ajoute le fichier seulement si l'extension est acceptée
      let newUpload: UploadType = {
        id: file.name + file.size,
        file,
        status: 'uploading',
      };

      // On s'assure qu'il n'y ait pas de doublons de fichiers
      const oldIds = uploads.map((upload) => upload.id);
      const newIds = newUploads.map((upload) => upload.id);
      if (!oldIds.includes(newUpload.id) && !newIds.includes(newUpload.id)) {
        newUploads.push(newUpload);
      }
    });

    // On ajoute les nouveaux fichiers chargés à la queue des fichiers déjà uploadés
    setUploads([...uploads, ...newUploads]);

    // On prépare l'envoi de tous les nouveaux fichiers chargés sur le serveur
    const uploadPromises = newUploads.map(async (upload: UploadType) => {
      const formData = new FormData();
      formData.append('file', upload.file || '');
      const result = await uploadFile(formData);
      return {
        ...upload,
        status: result?.status || 'error',
        url: result?.data?.fileUrl,
        error: result?.status === 'error' ? result.message : undefined,
      };
    });

    // On vide l'input file pour que le prochain upload ne contienne que des nouveaux fichiers
    if (inputRef.current) inputRef.current.value = '';

    // On lance l'envoi des fichiers
    const uploadResults: UploadType[] = await Promise.all(uploadPromises);

    // Quand l'upload est terminé, on met à jour les statuts des fichiers uploadés
    setUploads((prevUploads) =>
      prevUploads.map(
        (prevUpload) =>
          uploadResults.find((upload) => upload.id === prevUpload.id) ||
          prevUpload,
      ),
    );

    // On extrait toutes les urls des fichiers pour actualiser la valeur du composant
    const newUrls: string[] = uploadResults
      .map((upload) => upload.url)
      .filter((url): url is string => url !== undefined);

    const uniqueUrls = Array.from(new Set([...value, ...newUrls])); // Suppression des doublons

    onChange(uniqueUrls); // Actualisation de la valeur
  };

  // Gestion des fichiers déposés par glisser-déposer
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setActive(false);

    const files = event.dataTransfer.files;
    if (files) {
      await handleFiles(files);
    }
  };

  // Gestion des fichiers chargés dans l'input
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const fileList = event.target.files;
    if (fileList) {
      await handleFiles(fileList);
    }
  };

  // Retrait d'un fichier
  const handleRemove = (upload: UploadType) => {
    let newUploads = [...uploads].filter((u) => u.id !== upload.id);

    let newUrls = newUploads
      .map((u) => u.url)
      .filter((url): url is string => url !== undefined);

    let filteredValue = [...value].filter((url) => url !== upload.url);

    let newValue = Array.from(new Set([...filteredValue, ...newUrls]));

    setUploads(newUploads);
    onChange(newValue);
  };

  // Liste d'objets uploads correspondant à la liste d'URL préchargée dans le composant
  const previousUploads: UploadType[] = useMemo(() => {
    const currentUrls = uploads
      .map((upload) => upload.url)
      .filter((url): url is string => url !== undefined);

    const previousUrls = value.filter((url) => !currentUrls.includes(url));

    return previousUrls.map((url) => ({ id: url, url, status: 'success' }));
  }, [value, uploads]);

  // Afficher et traduire un message d'erreur
  const showError = (errorKey: string, params?: any) => {
    const errorMessage = t(errorKey, params);
    setError(errorMessage);
  };

  const handleActiveChange = (event: any) => {
    event.preventDefault();
    let newActiveValue = ['mouseenter', 'dragover', 'dragenter'].includes(
      event.type,
    );
    setActive(value.length < max ? newActiveValue : false);
  };

  return (
    <Stack
      sx={sx}
      spacing={1}
      onMouseEnter={handleActiveChange}
      onMouseLeave={handleActiveChange}
      onDragOver={handleActiveChange}
      onDragEnter={handleActiveChange}
      onDragLeave={handleActiveChange}
      onDrop={handleDrop}
    >
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        {label && <Typography color="text.secondary">{label}</Typography>}

        {value.length < max && (
          <>
            <CloudUpload color="action" sx={{ fontSize: 40 }} />

            <Typography variant="body2" color="text.secondary">
              {t('DropFiles')}
            </Typography>

            <Button onClick={() => inputRef?.current?.click()}>
              {t('Browse')}
            </Button>

            <input
              ref={inputRef}
              type="file"
              multiple={max > 1}
              style={{ display: 'none' }}
              onChange={handleInputChange}
              accept={extensions?.join(',')}
            />
          </>
        )}
      </Stack>

      {error && (
        <Alert severity="error">
          {error}{' '}
          <A onClick={() => setError(null)} sx={{ cursor: 'pointer' }}>
            OK
          </A>
        </Alert>
      )}

      {previousUploads.map((upload) => (
        <UploadRow
          upload={upload}
          onRemove={() => handleRemove(upload)}
          key={upload.id}
        />
      ))}

      {uploads.map((upload) => (
        <UploadRow
          upload={upload}
          onRemove={() => handleRemove(upload)}
          key={upload.id}
        />
      ))}
    </Stack>
  );
}
