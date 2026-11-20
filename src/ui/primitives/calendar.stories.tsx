import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { Calendar } from './calendar';

const meta = {
  title: 'Primitives/Calendar',
  component: Calendar,
  argTypes: {
    showOutsideDays: { control: 'boolean' },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
    buttonVariant: {
      control: 'select',
      options: ['primary', 'black', 'warning', 'secondary', 'tertiary', 'destructive'],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar {...args} mode="single" selected={date} onSelect={setDate} />;
  },
};

export const Range: Story = {
  render: function Render(args) {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });
    return <Calendar {...args} mode="range" selected={range} onSelect={setRange} />;
  },
};

export const Multiple: Story = {
  render: function Render(args) {
    const [dates, setDates] = React.useState<Date[] | undefined>([new Date()]);
    return <Calendar {...args} mode="multiple" selected={dates} onSelect={setDates} />;
  },
};

export const WithDropdowns: Story = {
  args: { captionLayout: 'dropdown' },
  render: function Render(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        startMonth={new Date(1950, 0)}
        endMonth={new Date(2050, 11)}
      />
    );
  },
};

export const DisabledDates: Story = {
  render: function Render(args) {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
      />
    );
  },
};

export const HideOutsideDays: Story = {
  args: { showOutsideDays: false },
  render: function Render(args) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar {...args} mode="single" selected={date} onSelect={setDate} />;
  },
};
