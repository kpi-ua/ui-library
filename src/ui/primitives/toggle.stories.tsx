import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoldIcon, ItalicIcon } from 'lucide-react';

import { Toggle } from './toggle';

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Toggle bold',
    children: <BoldIcon />,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const Pressed: Story = { args: { defaultPressed: true } };

export const WithText: Story = {
  args: {
    'aria-label': 'Toggle italic',
    children: (
      <>
        <ItalicIcon />
        Italic
      </>
    ),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Toggle {...args} size="sm" />
      <Toggle {...args} size="default" />
      <Toggle {...args} size="lg" />
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
