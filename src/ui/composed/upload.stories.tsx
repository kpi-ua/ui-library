import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { type MimeType, type UploadingFile } from '@/types/common';

import { Upload, UploadItem } from './upload';

const createFile = (name: string, mimeType: MimeType, size: number): UploadingFile => ({
  id: name,
  name,
  size,
  mimeType,
  status: 'uploading',
  uploadProgress: 0,
  uploadStatus: 'uploading',
  file: new File([], name, { type: mimeType }),
  controller: new AbortController(),
});

const pdf = createFile('passport.pdf', 'application/pdf', 2_411_724);

const itemActions = {
  onCancelClick: fn(),
  onDeleteClick: fn(),
  onReuploadClick: fn(),
};

const meta = {
  title: 'Composed/Upload',
  component: Upload,
  args: {
    title: 'Click to upload or drag and drop',
    description: 'JPG, PNG or PDF (max. 10 MB)',
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: [
          'Two components for working with files.',
          '',
          '`Upload` is a drop zone with a file picker. It calls `onSelect` with the chosen or dropped `FileList`.',
          '',
          '`UploadItem` shows a single file and comes in three modes: `static` (no controls), `preview` (preview and download buttons) and `uploading` (progress, status and cancel / delete / retry controls). The `UploadItem` stories do not use the controls panel; their props are set in each story.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true, title: 'Upload documents', description: 'You can select several files at once' },
};

export const ImagesOnly: Story = {
  args: { acceptedTypes: ['image/jpeg', 'image/png'], description: 'JPG or PNG' },
};

export const PdfOnly: Story = {
  args: { acceptedTypes: ['application/pdf'], description: 'PDF only' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, description: 'File is required' },
};

export const ItemStatic: Story = {
  render: () => <UploadItem uploadingFile={pdf} mode="static" />,
};

export const ItemPreview: Story = {
  render: () => (
    <UploadItem uploadingFile={pdf} mode="preview" onPreviewClick={fn()} downloadUrl="https://test.com/test.jpg" />
  ),
};

export const ItemUploading: Story = {
  render: () => (
    <UploadItem
      {...itemActions}
      uploadingFile={pdf}
      mode="uploading"
      uploadStatus="uploading"
      uploadProgressBytes={1_205_862}
    />
  ),
};

export const ItemUploaded: Story = {
  render: () => (
    <UploadItem
      {...itemActions}
      uploadingFile={pdf}
      mode="uploading"
      uploadStatus="finished"
      uploadProgressBytes={pdf.size}
    />
  ),
};

export const ItemError: Story = {
  render: () => (
    <UploadItem
      {...itemActions}
      uploadingFile={pdf}
      mode="uploading"
      uploadStatus="error"
      uploadProgressBytes={602_931}
    />
  ),
};

export const ItemLongName: Story = {
  render: () => (
    <UploadItem
      uploadingFile={createFile(
        'very-long-document-name-with-many-words-and-details-2026-final-version.pdf',
        'application/pdf',
        524_288,
      )}
    />
  ),
};

export const ItemFileTypes: Story = {
  render: () => (
    <div className="grid gap-2">
      <UploadItem uploadingFile={createFile('photo.jpg', 'image/jpeg', 1_048_576)} />
      <UploadItem uploadingFile={createFile('scan.png', 'image/png', 3_145_728)} />
      <UploadItem uploadingFile={pdf} />
    </div>
  ),
};

export const UploadWithItems: Story = {
  render: (args) => (
    <div className="grid gap-3">
      <Upload {...args} multiple />
      <UploadItem
        {...itemActions}
        uploadingFile={pdf}
        mode="uploading"
        uploadStatus="finished"
        uploadProgressBytes={pdf.size}
      />
      <UploadItem
        {...itemActions}
        uploadingFile={createFile('photo.jpg', 'image/jpeg', 1_048_576)}
        mode="uploading"
        uploadStatus="uploading"
        uploadProgressBytes={524_288}
      />
    </div>
  ),
};
