import type { Meta, StoryObj } from '@storybook/react-vite';

import CircleWavyCheck from '@/icons/CircleWavyCheck.svg';
import Info from '@/icons/Info.svg';
import WarningIcon from '@/icons/Warning.svg';
import WarningCircle from '@/icons/WarningCircle.svg';

import { Alert, AlertDescription, AlertTitle } from './alert';

const variantOptions = ['default', 'destructive', 'success', 'warning'] as const;

const meta = {
  title: 'Primitives/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
    },
    outline: { control: 'boolean' },
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variantOptions.map((variant) => (
        <Alert key={variant} {...args} variant={variant}>
          <AlertTitle>{variant}</AlertTitle>
          <AlertDescription>Outline alert with an icon for the {variant} variant.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => {
    const items = [
      { variant: 'default', icon: <Info /> },
      { variant: 'destructive', icon: <WarningCircle /> },
      { variant: 'success', icon: <CircleWavyCheck /> },
      { variant: 'warning', icon: <WarningIcon /> },
    ] as const;

    return (
      <div className="flex flex-col gap-4">
        {items.map(({ variant, icon }) => (
          <Alert key={variant} {...args} variant={variant}>
            {icon}
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Outline alert with an icon for the {variant} variant.</AlertDescription>
          </Alert>
        ))}
      </div>
    );
  },
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Your changes have been saved.</AlertTitle>
    </Alert>
  ),
};

export const Outline: Story = {
  args: { outline: true },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variantOptions.map((v) => (
        <Alert key={v} {...args} variant={v}>
          <AlertTitle>{v}</AlertTitle>
          <AlertDescription>Outline alert for the {v} variant.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

export const OutlineWithIcon: Story = {
  args: { outline: true },
  render: (args) => {
    const items = [
      { variant: 'default', icon: <Info /> },
      { variant: 'destructive', icon: <WarningCircle /> },
      { variant: 'success', icon: <CircleWavyCheck /> },
      { variant: 'warning', icon: <WarningIcon /> },
    ] as const;

    return (
      <div className="flex flex-col gap-4">
        {items.map(({ variant, icon }) => (
          <Alert key={variant} {...args} variant={variant}>
            {icon}
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Outline alert with an icon for the {variant} variant.</AlertDescription>
          </Alert>
        ))}
      </div>
    );
  },
};
