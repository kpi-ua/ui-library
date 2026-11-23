export const MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const;

export type MimeType = (typeof MIME_TYPES)[number];

export const MIME_TYPE_EXTENSIONS: Record<MimeType, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'application/pdf': ['pdf'],
};

export type UploadStatus = 'uploading' | 'finished' | 'error';

type BaseFile = {
  id: string;
  name: string;
  size: number;
  mimeType: MimeType;
};

export type UploadingFile = BaseFile & {
  status: 'uploading';
  uploadProgress: number;
  uploadStatus: UploadStatus;
  file: File;
  controller: AbortController;
};
