import type { Meta, StoryObj } from '@storybook/react-vite';
import { UList } from './lists';

const meta = {
  title: 'Typography/List',
  component: UList,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
  },
} satisfies Meta<typeof UList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
