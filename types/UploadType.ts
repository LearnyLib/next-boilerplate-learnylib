/**
 * Informations liées à l'upload d'un fichier sur Clever Cloud Cellar s3
 */
export default interface UploadType {
  id: string;
  file?: File | undefined;
  url?: string | undefined;
  status: 'uploading' | 'canceled' | 'error' | 'success';
  error?: string | undefined;
}
