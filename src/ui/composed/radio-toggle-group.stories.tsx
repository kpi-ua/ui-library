import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { RadioToggleGroup, RadioToggleGroupItem } from './radio-toggle-group';

const meta = {
  title: 'Composed/RadioToggleGroup',
  component: RadioToggleGroup,
  argTypes: {
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { defaultValue: 'individual' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A `RadioGroup` presented as large selectable cards. It is intended for forms, as a more visible alternative to a simple radio group.',
          '',
          'Use it to pick a single type or category of something (for example `Individual` / `Company`), when the choice is important enough that the options should be shown as clearly separated cards instead of small radio inputs.',
          '',
          'It is built on the `RadioGroup` and `RadioGroupItem` primitives, so it behaves like a native radio group: arrow keys move the selection, and the selected option cannot be unselected by clicking it again. It accepts the same props as `RadioGroup` (`defaultValue`, `value` / `onValueChange`, `disabled`, `name`, `aria-invalid`, ...), and `RadioToggleGroupItem` accepts the props of `RadioGroupItem`.',
          '',
          'The group fills the available width. On small screens the cards are stacked; on larger screens they sit in a row and share the width evenly.',
        ].join('\n'),
      },
    },
  },
  render: (args) => (
    <RadioToggleGroup {...args}>
      <RadioToggleGroupItem value="individual">Individual</RadioToggleGroupItem>
      <RadioToggleGroupItem value="company">Company</RadioToggleGroupItem>
    </RadioToggleGroup>
  ),
} satisfies Meta<typeof RadioToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unselected: Story = { args: { defaultValue: undefined } };

export const ThreeOptions: Story = {
  args: { defaultValue: 'weekly' },
  render: (args) => (
    <RadioToggleGroup {...args}>
      <RadioToggleGroupItem value="daily">Daily</RadioToggleGroupItem>
      <RadioToggleGroupItem value="weekly">Weekly</RadioToggleGroupItem>
      <RadioToggleGroupItem value="monthly">Monthly</RadioToggleGroupItem>
    </RadioToggleGroup>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('company');

    return (
      <div className="flex flex-col gap-3">
        <RadioToggleGroup value={value} onValueChange={setValue}>
          <RadioToggleGroupItem value="individual">Individual</RadioToggleGroupItem>
          <RadioToggleGroupItem value="company">Company</RadioToggleGroupItem>
        </RadioToggleGroup>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

export const Invalid: Story = { args: { defaultValue: undefined, 'aria-invalid': true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledItem: Story = {
  render: (args) => (
    <RadioToggleGroup {...args}>
      <RadioToggleGroupItem value="individual">Individual</RadioToggleGroupItem>
      <RadioToggleGroupItem value="company" disabled>
        Company
      </RadioToggleGroupItem>
    </RadioToggleGroup>
  ),
};
