import type { Meta, StoryObj } from '@storybook/react-vite';

import PasswordInput from './password-input';

const meta = {
  title: 'Composed/PasswordInput',
  component: PasswordInput,
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Password' },
};

export const WithValue: Story = {
  args: { defaultValue: 'secret-password' },
};

export const Disabled: Story = {
  args: { defaultValue: 'secret-password', disabled: true },
};

export const Invalid: Story = {
  args: { defaultValue: 'short', 'aria-invalid': true },
};
