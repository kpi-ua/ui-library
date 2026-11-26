import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from './textarea';

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
  args: { placeholder: 'Type your message' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = { args: { defaultValue: 'Hello,\nthis is a message.' } };

export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'Too short' } };

export const Disabled: Story = { args: { disabled: true } };
