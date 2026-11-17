import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from './paragraph';

const meta = {
  title: 'Typography/Paragraph',
  component: Paragraph,
  parameters: { layout: 'padded' },
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: ({ children }) => (
    <>
      <Paragraph>{children}</Paragraph>
      <Paragraph>{children}</Paragraph>
    </>
  ),
};
