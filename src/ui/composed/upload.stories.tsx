import type { Meta, StoryObj } from '@storybook/react-vite';

import { Upload } from './upload';

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
