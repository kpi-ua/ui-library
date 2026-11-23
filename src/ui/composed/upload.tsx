'use client';

import clsx from 'clsx';
import { CloudUpload } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { MIME_TYPE_EXTENSIONS, type MimeType } from '@/types/common';

import { Item } from '../primitives/item';

interface FileUploadProps {
  acceptedTypes?: MimeType[];
  multiple?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
  className?: string;
  onSelect?: (fileList: FileList) => void;
}

export function Upload({
  acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
  multiple,
  title,
  description,
  className,
  onSelect,
}: FileUploadProps) {
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
        { 'ring-brand-500 border-brand-500 ring-1': isDragging },
        className,
      )}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
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
