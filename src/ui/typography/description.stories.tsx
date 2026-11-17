import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading2 } from './headers';
import { Description } from './description';

const meta = {
  title: 'Typography/Description',
  component: Description,
  parameters: { layout: 'padded' },
  args: { children: 'Supporting text displayed below a page or section title.' },
} satisfies Meta<typeof Description>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UnderHeading: Story = {
  render: ({ children }) => (
    <>
      <Heading2>Page title</Heading2>
      <Description>{children}</Description>
    </>
  ),
};
