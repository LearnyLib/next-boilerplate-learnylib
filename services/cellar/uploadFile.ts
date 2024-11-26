'use server';
import S3 from './S3';
import { FileUploadOptionsType, FormStateType } from '../../types';
import getFileUrl from './getFileUrl';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { acceptedFileExtensions, uploadMaxSize } from './config';
import { generateUniqueId, getFileExtension } from '../../utils';

/**
 * Upload de fichiers avec Clever Cloud Cellar S3 et aws-sdk
 * @param {FormData} formData - Données de formulaire contenant un fichier à la clé file
 * @returns {Promise<FormStateType>}
 */
export default async function uploadFile(
  formData: FormData,
  options?: FileUploadOptionsType,
): Promise<FormStateType> {
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return {
      status: 'error',
      message: 'MissingFile',
      errors: { file: ['MissingFile'] },
    };
  }

  // Contrôle de l'extension
  const extension = getFileExtension(file.name);
  if (!acceptedFileExtensions.includes(extension)) {
    return {
      status: 'error',
      message: 'UnsupportedFileFormat',
      errors: { file: ['UnsupportedFileFormat'] },
    };
  }

  // Contrôle du poids du fichier
  if (file.size > uploadMaxSize) {
    return {
      status: 'error',
      message: 'FileTooLarge',
      errors: { file: ['FileTooLarge'] },
    };
  }

  // Nommage du fichier
  const fileUniqueId = generateUniqueId();
  const fileName = `${fileUniqueId}_${options?.namePrefix ? `${options.namePrefix}_` : ''}${file.name.split('.')[0]}${extension}`;

  // Upload
  try {
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Préparer la commande pour l'upload
    const uploadCommand = new PutObjectCommand({
      Body: buffer,
      Bucket: process.env.CELLAR_BUCKET || '',
      Key: fileName,
      ACL: options?.isPrivate ? 'private' : 'public-read',
    });

    // Exécuter la commande
    await S3.send(uploadCommand);

    let fileUrl: string;

    if (options?.isPrivate) {
      fileUrl = await getFileUrl(fileName);
    } else {
      fileUrl = `https://${process.env.CELLAR_HOST}/${process.env.CELLAR_BUCKET}/${fileName}`;
    }

    return {
      status: 'success',
      message: 'UploadSuccess',
      data: { fileUrl },
    };
  } catch (error) {
    console.log('Failed to upload file', error);

    return {
      status: 'error',
      message: 'FileUploadFailed',
      errors: { file: ['FileUploadFailed'] },
    };
  }
}
