'use client';

import clsx from 'clsx';
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
import { useMemo, useRef, useState } from 'react';

import FileTypeJpg from '@/icons/FileTypeJpg.svg';
import FileTypePdf from '@/icons/FileTypePdf.svg';
import FileTypePng from '@/icons/FileTypePng.svg';
import { cn } from '@/lib/utils';

import { MIME_TYPE_EXTENSIONS, type MimeType, type UploadingFile, type UploadStatus } from '../../types/common';
import { Button } from '../primitives/button';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle } from '../primitives/item';
import { Progress } from '../primitives/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../primitives/tooltip';
import { Show } from '../utility/show';

// Remaining input props (multiple, disabled, name, aria-*, ...) go to the hidden file input; `className` styles the drop zone.
interface FileUploadProps extends Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'type' | 'accept' | 'title' | 'onChange' | 'onSelect'
> {
  acceptedTypes?: MimeType[];
  title?: string;
  description?: string;
  onSelect?: (fileList: FileList) => void;
}

export function Upload({
  acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
  title,
  description,
  className,
  onSelect,
  ...inputProps
}: FileUploadProps) {
  const invalid = inputProps['aria-invalid'] === true || inputProps['aria-invalid'] === 'true';
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedExtensions = useMemo(
    () =>
      acceptedTypes?.reduce(
        (acc: string[], acceptedType: MimeType) => [...acc, ...MIME_TYPE_EXTENSIONS[acceptedType]],
        [],
      ) || [],
    [acceptedTypes],
  );

  // For input field
  const accept = useMemo(() => acceptedExtensions.map((x: string) => `.${x}`).join(','), [acceptedExtensions]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      onSelect?.(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    if (files) {
      onSelect?.(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Item
      variant="outline"
      className={cn(
        'hover:ring-brand-500 hover:border-brand-500 cursor-pointer items-start shadow-none hover:ring-1',
        {
          'border-destructive/60 ring-destructive/60 hover:border-destructive/60 hover:ring-destructive/60 ring-1':
            invalid,
        },
        { 'ring-brand-500 border-brand-500 ring-1': isDragging },
        className,
      )}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        {...inputProps}
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="flex w-full flex-col items-center gap-4 px-6 text-center">
        <div className="border-border bg-background flex h-10 w-10 items-center justify-center rounded-sm border text-gray-600 shadow-[inset_0_-1px_2px_#0A0D120D]">
          <CloudUpload strokeWidth={1.75} className={clsx({ 'animate-bounce': isDragging })} />
        </div>

        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-foreground font-semibold">{title}</span>
          </p>

          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>
    </Item>
  );
}

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

export const UploadItem = ({
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
        <ItemTitle className="line-clamp-1 pr-5 wrap-anywhere">{uploadingFile.name}</ItemTitle>
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
                variant="secondary"
                className="w-full"
                type="button"
                onClick={() => {
                  // TODO:
                }}
              >
                <Eye strokeWidth={1.75} />
                Переглянути
              </Button>
              <Button size="sm" variant="secondary" className="w-full" type="button">
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
