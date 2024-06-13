'use server';
import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import S3 from './S3';

/**
 * Récupérer l'url d'un fichier stocké sur Clever Cloud Cellar S3
 * @param {string} fileName - Nom du fichier
 * @return {Promise<string>} - URL signée temporaire du fichier
 */
export default async function getFileUrl(fileName: string): Promise<string> {
  try {
    const bucket = process.env.CELLAR_BUCKET || '';

    // Checker le fichier dans le bucket
    const headObjectCommand = new HeadObjectCommand({
      Bucket: bucket,
      Key: fileName,
    });

    try {
      await S3.send(headObjectCommand);
    } catch (error) {
      throw new Error('Failed to get file');
    }

    // Générer une URL signée pour le fichier
    const url = await getSignedUrl(
      S3,
      new GetObjectCommand({
        Bucket: bucket,
        Key: fileName,
      }),
      { expiresIn: 3600 }, // Valide pendant 1 heure
    );

    return url;
  } catch (error) {
    throw new Error('Failed to get file');
  }
}
