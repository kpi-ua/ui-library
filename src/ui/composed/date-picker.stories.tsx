import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { fn } from 'storybook/test';

import { DatePicker } from './date-picker';

const meta = {
  title: 'Composed/DatePicker',
  component: DatePicker,
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  render: function Render(args) {
    const [value, setValue] = React.useState<string | null | undefined>(args.value);

    return (
      <div className="w-72">
        <DatePicker
          {...args}
          value={value}
          onChange={(date) => {
            setValue(date);
            args.onChange?.(date);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: '2000-01-15' },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: 'Date of birth' },
};

export const Disabled: Story = {
  args: { value: '2000-01-15', disabled: true },
};

export const DisabledDates: Story = {
  args: {
    placeholder: 'Weekdays in the future only',
    dateDisabled: [{ dayOfWeek: [0, 6] }, { before: new Date() }],
  },
};

export const HiddenDates: Story = {
  args: {
    placeholder: 'Past dates hidden',
    hidden: { before: new Date() },
  },
};
