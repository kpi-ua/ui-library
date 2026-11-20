import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Progress } from './progress';

const meta = {
  title: 'Primitives/Progress',
  component: Progress,
  args: { value: 60 },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { value: 0 },
};

export const Complete: Story = {
  args: { value: 100 },
};

export const CustomColors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Progress {...args} className="bg-status-success-100" indicatorClassName="bg-status-success-300" />
      <Progress {...args} className="bg-status-warning-100" indicatorClassName="bg-status-warning-300" />
      <Progress {...args} className="bg-status-error-100" indicatorClassName="bg-status-danger-300" />
    </div>
  ),
};

export const CustomHeight: Story = {
  args: { className: 'h-4' },
};

export const Animated: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 600);
      return () => clearInterval(id);
    }, []);

    return <Progress {...args} value={value} />;
  },
};
