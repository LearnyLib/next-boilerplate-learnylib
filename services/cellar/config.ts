/**
 * Extensions de fichiers autorisées à l'upload
 */
export const acceptedFileExtensions: string[] = [
  // Documents
  '.pdf', // PDF
  '.doc', // Microsoft Word
  '.docx', // Microsoft Word (nouveau format)
  '.xls', // Microsoft Excel
  '.xlsx', // Microsoft Excel (nouveau format)
  '.ppt', // Microsoft PowerPoint
  '.pptx', // Microsoft PowerPoint (nouveau format)
  '.txt', // Plain Text
  '.rtf', // Rich Text Format
  '.odt', // OpenDocument Text
  '.ods', // OpenDocument Spreadsheet
  '.odp', // OpenDocument Presentation

  // Images
  '.jpg', // JPEG
  '.jpeg', // JPEG
  '.png', // PNG
  '.gif', // GIF
  '.bmp', // Bitmap
  '.tiff', // TIFF
  '.svg', // SVG
  '.webp', // WebP

  // Audios
  '.mp3', // MP3
  '.wav', // WAV
  '.ogg', // OGG
  '.aac', // AAC
  '.flac', // FLAC

  // Vidéos
  '.mp4', // MP4
  '.webm', // WebM
  '.avi', // AVI
  '.mkv', // MKV
  '.mov', // MOV
  '.flv', // FLV

  // Archives
  '.zip', // ZIP
  '.rar', // RAR
  '.7z', // 7-Zip
  '.tar', // Tarball
  '.tar.gz', // Tarball Gzipped
];

/**
 * Poids de fichier maximal autorisé
 */
export const uploadMaxSize: number = 10000000;
