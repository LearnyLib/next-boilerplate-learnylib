import { S3Client } from '@aws-sdk/client-s3';

// Clés Cellar
const host = process.env.CELLAR_HOST || '';
const key = process.env.CELLAR_KEY_ID || '';
const secret = process.env.CELLAR_KEY_SECRET || '';

/**
 * Configuration du service S3 avec credentials manuels
 */
const S3 = new S3Client({
  region: 'us-east-1',
  endpoint: `https://${host}`,
  credentials: {
    accessKeyId: key,
    secretAccessKey: secret,
  },
  forcePathStyle: true, // Cela peut être nécessaire pour certains services compatibles S3 comme Cellar
});

export default S3;
