import type { Meta, StoryObj } from '@storybook/react-vite';

import { Paragraph } from './paragraph';
import { Strong } from './strong';

const meta = {
  title: 'Typography/Strong',
  component: Strong,
  parameters: { layout: 'padded' },
  args: { children: 'Important text' },
} satisfies Meta<typeof Strong>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InParagraph: Story = {
  render: ({ children }) => (
    <Paragraph>
      Regular text with <Strong>{children}</Strong> inside.
    </Paragraph>
  ),
};
