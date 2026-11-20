import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

const variantOptions = ['red', 'pink', 'purple', 'orange', 'green', 'blue', 'gray'] as const;

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
    },
    outline: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Badge key={v} {...args} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};

export const Outline: Story = {
  args: { outline: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Badge key={v} {...args} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};
