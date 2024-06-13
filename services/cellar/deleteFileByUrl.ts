'use server';
import { DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import S3 from './S3';
import getFileNameFromUrl from '../../utils/getFileNameFromUrl';

/**
 * Supprimer un fichier stocké sur Clever Cloud Cellar S3
 * @param {string} fileUrl - URL du fichier à supprimer
 * @return {Promise<void>} - Promesse résolue si le fichier est supprimé
 */
export default async function deleteFileByUrl(fileUrl: string): Promise<void> {
  try {
    const bucket = process.env.CELLAR_BUCKET || '';

    // Extraction du nom du fichier à partir de l'URL
    const fileName = getFileNameFromUrl(fileUrl);

    // Vérifier l'existence du fichier dans le bucket
    const headObjectCommand = new HeadObjectCommand({
      Bucket: bucket,
      Key: fileName,
    });

    try {
      await S3.send(headObjectCommand);
    } catch (error) {
      throw new Error('File does not exist or cannot be accessed');
    }

    // Supprimer le fichier
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: bucket,
      Key: fileName,
    });

    try {
      await S3.send(deleteObjectCommand);
    } catch (error) {
      throw new Error('Failed to delete file');
    }
  } catch (error) {
    console.log(`Failed to delete file`, error);
    throw new Error('Failed to delete file');
  }
}
