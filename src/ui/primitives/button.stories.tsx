import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import WarningCircle from '@/icons/WarningCircle.svg';
import SpinnerGap from '@/icons/SpinnerGap.svg';

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

export const IconLeft: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v}>
         <WarningCircle /> {v}
        </Button>
      ))}
    </div>
  ),
};

export const IconRight: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v}>
        {v} <WarningCircle />
        </Button>
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

export const IconSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizeOptions.map((s) => (
        <Button key={s} {...args} size={s}>
          <WarningCircle /> Button {s.toUpperCase()}
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
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variantOptions.map((v) => (
        <Button key={v} {...args} variant={v} disabled>
          <SpinnerGap /> {v}
        </Button>
      ))}
    </div>
  ),
};

