import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';

const sizes = ['sm', 'default', 'lg'] as const;

const imageSrc =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23818cf8'/><circle cx='20' cy='16' r='7' fill='white'/><path d='M6 40c0-9 6-14 14-14s14 5 14 14z' fill='white'/></svg>";

const meta = {
  title: 'Primitives/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
  },
  args: { size: 'default' },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={imageSrc} alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={imageSrc} alt="User" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={imageSrc} alt="User" />
          <AvatarFallback>AB</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src={imageSrc} alt="User 1" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
