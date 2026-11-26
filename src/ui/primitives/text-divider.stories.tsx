import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { TextDivider } from './text-divider';

const meta = {
  title: 'Primitives/TextDivider',
  component: TextDivider,
  args: { children: 'or' },
  argTypes: { children: { control: 'text' } },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal line with a short label in the middle. It is usually used with `or` to separate alternative actions, for example sign in with a password or with a third-party provider.',
      },
    },
  },
} satisfies Meta<typeof TextDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = { args: { children: 'or continue with' } };

export const BetweenActions: Story = {
  render: (args) => (
    <div className="flex flex-col">
      <Button>Sign in</Button>
      <TextDivider {...args} />
      <Button variant="secondary">Sign in with Google</Button>
    </div>
  ),
};
