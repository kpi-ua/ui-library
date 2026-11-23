import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { type MimeType, type UploadingFile } from '@/types/common';

import { UploadItem } from './upload-item';

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

const meta = {
  title: 'Composed/UploadItem',
  component: UploadItem,
  args: {
    uploadingFile: pdf,
    onCancelClick: fn(),
    onDeleteClick: fn(),
    onReuploadClick: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UploadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = { args: { mode: 'static' } };

export const Preview: Story = {
  args: { mode: 'preview', onPreviewClick: fn(), downloadUrl: 'https://test.com/test.jpg' },
};

export const Uploading: Story = {
  args: {
    mode: 'uploading',
    uploadStatus: 'uploading',
    uploadProgressBytes: 1_205_862,
  },
};

export const Uploaded: Story = {
  args: {
    mode: 'uploading',
    uploadStatus: 'finished',
    uploadProgressBytes: pdf.size,
  },
};

export const UploadError: Story = {
  args: {
    mode: 'uploading',
    uploadStatus: 'error',
    uploadProgressBytes: 602_931,
  },
};

export const LongName: Story = {
  args: {
    uploadingFile: createFile(
      'very-long-document-name-with-many-words-and-details-2026-final-version.pdf',
      'application/pdf',
      524_288,
    ),
  },
};

export const FileTypes: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <UploadItem {...args} uploadingFile={createFile('photo.jpg', 'image/jpeg', 1_048_576)} />
      <UploadItem {...args} uploadingFile={createFile('scan.png', 'image/png', 3_145_728)} />
      <UploadItem {...args} uploadingFile={pdf} />
    </div>
  ),
};
