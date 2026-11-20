import { filesize } from 'filesize';
import {
  ArrowDownToLine,
  CircleCheck,
  CircleStop,
  CircleX,
  CloudUpload,
  Eye,
  RefreshCw,
  Trash2,
  type LucideProps,
} from 'lucide-react';

import FileTypeJpg from '@/icons/FileTypeJpg.svg';
import FileTypePdf from '@/icons/FileTypePdf.svg';
import FileTypePng from '@/icons/FileTypePng.svg';
import { cn } from '@/lib';

import { Button } from '../primitives';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle } from '../primitives/item';
import { Progress } from '../primitives/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../primitives/tooltip';
import { Show } from '../utility/show';

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

/*
 * Document component modes:
 * `static` - show already uploaded document without any controls
 * `preview` - show uploaded document for operator (with preview and download buttons)
 * `uploading` - show document with uploading states (uploading progress and cancel / delete controls)
 */
type DocumentMode = 'static' | 'preview' | 'uploading';

interface DocumentProps {
  uploadingFile: UploadingFile;
  uploadProgressBytes?: number;
  uploadStatus?: UploadStatus;
  downloadUrl?: string;
  mode?: DocumentMode;
  onDeleteClick?: () => void;
  onCancelClick?: () => void;
  onReuploadClick?: () => void;
  onPreviewClick?: (documentFile: UploadingFile) => void;
  className?: string;
}

const FileTypeIcon: Record<MimeType, React.ReactElement> = {
  'image/jpeg': <FileTypeJpg className="size-10" />,
  'image/png': <FileTypePng className="size-10" />,
  'application/pdf': <FileTypePdf className="size-10" />,
};

const ActionButton = ({
  tooltip,
  icon: Icon,
  action,
}: {
  tooltip: string;
  icon: React.ElementType<LucideProps>;
  action?: () => void;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button size="sm" variant="tertiary" className="p-1.5" onClick={action} type="button">
        <Icon size={16} strokeWidth={1.5} />
      </Button>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);

export const UploadedDocument = ({
  uploadingFile,
  uploadProgressBytes,
  uploadStatus = 'finished',
  mode = 'static',
  downloadUrl,
  onCancelClick,
  onDeleteClick,
  onReuploadClick,
  onPreviewClick,
  className,
}: DocumentProps) => {
  const getProgress = () => {
    return Math.floor(((uploadProgressBytes || 0) / uploadingFile.size) * 100);
  };

  // const handleSaveFile = async () => {
  //   if (!downloadUrl) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(downloadUrl);
  //     if (!response.ok) throw new Error('Failed to fetch file.');

  //     const blob = await response.blob();
  //     saveAs(blob, documentFile.name);
  //   } catch (error) {
  //     console.error('Download error:', error);
  //   }
  // };

  const renderActionButton = () => {
    switch (uploadStatus) {
      case 'error':
        return <ActionButton action={onReuploadClick} icon={RefreshCw} tooltip="Спробувати завантажити ще раз" />;
      case 'finished':
        return <ActionButton action={onDeleteClick} icon={Trash2} tooltip="Видалити файл" />;
      default:
        return <ActionButton action={onCancelClick} icon={CircleStop} tooltip="Скасувати завантаження" />;
    }
  };

  const renderFileDescription = () => {
    return <ItemDescription>{filesize(uploadingFile.size, { standard: 'jedec' })}</ItemDescription>;
  };

  const renderProgress = () => {
    return (
      <div className="flex flex-col gap-1">
        <ItemDescription
          className={cn('flex items-center gap-2', {
            'text-status-success-600': uploadStatus === 'finished' && uploadProgressBytes,
            'text-status-error-600': uploadStatus === 'error',
          })}
        >
          {uploadStatus === 'uploading' && (
            <>
              <CloudUpload size={16} strokeWidth={1.75} />
              Завантаження...
            </>
          )}
          {uploadStatus === 'finished' && (
            <>
              {uploadProgressBytes ? (
                <>
                  <CircleCheck size={16} strokeWidth={1.75} />
                  Завантажено
                </>
              ) : (
                filesize(uploadingFile.size, { standard: 'jedec' })
              )}
            </>
          )}
          {uploadStatus === 'error' && (
            <>
              <CircleX size={16} strokeWidth={1.75} />
              Помилка
            </>
          )}
        </ItemDescription>
        {mode === 'uploading' && ['uploading', 'error'].includes(uploadStatus) && (
          <div className="flex items-baseline gap-4">
            <Progress
              value={getProgress()}
              indicatorClassName={cn({ 'bg-status-error-600': uploadStatus === 'error' })}
            />
            <span className="text-xs">{getProgress()}%</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Item variant="outline" className={cn('relative items-start', className)}>
      <ItemMedia>{FileTypeIcon[uploadingFile.mimeType]}</ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1 pr-5 [overflow-wrap:anywhere]">{uploadingFile.name}</ItemTitle>
        <Show when={['static', 'preview'].includes(mode)}>{renderFileDescription()}</Show>
        <Show when={['uploading'].includes(mode)}>{renderProgress()}</Show>
      </ItemContent>
      <Show when={['uploading'].includes(mode)}>
        <div className="absolute top-2 right-2">{renderActionButton()}</div>
      </Show>
      <Show when={mode === 'preview' && !!onPreviewClick}>
        <ItemFooter className="gap-4">
          {downloadUrl && (
            <>
              <Button
                size="sm"
                variant="tertiary"
                className="w-full"
                type="button"
                onClick={() => {
                  // if (onPreviewClick) {
                  //   onPreviewClick(documentFile);
                  // } else {
                  //   window.open(downloadUrl, '_blank', 'noopener,noreferrer');
                  // }
                }}
              >
                <Eye strokeWidth={1.75} />
                Переглянути
              </Button>
              <Button size="sm" variant="tertiary" className="w-full" type="button">
                <ArrowDownToLine strokeWidth={1.75} />
                Завантажити
              </Button>
            </>
          )}
        </ItemFooter>
      </Show>
    </Item>
  );
};
