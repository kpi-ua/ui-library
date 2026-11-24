import type { Meta, StoryObj } from '@storybook/react-vite';

import WarningCircle from '@/icons/WarningCircle.svg';

import { Button } from './button';

const variantOptions = ['primary', 'black', 'warning', 'secondary', 'tertiary', 'destructive'] as const;
const sizeOptions = ['sm', 'md', 'lg', 'xl'] as const;

const meta = {
  title: 'Primitives/Button',
  component: Button,
  args: { children: 'Button' },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
    icon: {
      control: 'select',
      options: ['none', 'warning'],
      mapping: { none: undefined, warning: <WarningCircle /> },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const IconStart: Story = {
  args: { icon: <WarningCircle />, iconPosition: 'start' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const IconEnd: Story = {
  args: { icon: <WarningCircle />, iconPosition: 'end' },
  render: IconStart.render,
};

export const OnlyIcon: Story = {
  args: { icon: <WarningCircle />, children: undefined },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v} aria-label={v} />
      ))}
    </div>
  ),
};

export const OnlyIconSizes: Story = {
  args: { icon: <WarningCircle />, children: undefined },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizeOptions.map((s) => (
        <Button key={s} {...args} size={s} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizeOptions.map((s) => (
        <Button key={s} {...args} size={s}>
          Button {s.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const SizesWithIcon: Story = {
  args: { icon: <WarningCircle /> },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizeOptions.map((s) => (
        <Button key={s} {...args} size={s}>
          Button {s.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v} disabled>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};
