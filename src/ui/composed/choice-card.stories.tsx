import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { ChoiceCard, ChoiceCardItem } from './choice-card';

const meta = {
  title: 'Composed/ChoiceCard',
  component: ChoiceCard,
  argTypes: {
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: [undefined, 'horizontal', 'vertical'] },
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
          'It is built on the `RadioGroup` and `RadioGroupItem` primitives, so it behaves like a native radio group: arrow keys move the selection, and the selected option cannot be unselected by clicking it again. It accepts the same props as `RadioGroup` (`defaultValue`, `value` / `onValueChange`, `disabled`, `name`, `aria-invalid`, ...), and `ChoiceCardItem` accepts the props of `RadioGroupItem`.',
          '',
          'The group fills the available width. By default, cards are stacked on small screens and sit in a row on larger screens, sharing the width evenly. Set `orientation` to `vertical` to always stack them, or to `horizontal` to always keep them in a row.',
        ].join('\n'),
      },
    },
  },
  render: (args) => (
    <ChoiceCard {...args}>
      <ChoiceCardItem value="individual">Individual</ChoiceCardItem>
      <ChoiceCardItem value="company">Company</ChoiceCardItem>
    </ChoiceCard>
  ),
} satisfies Meta<typeof ChoiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unselected: Story = { args: { defaultValue: undefined } };

export const ThreeOptions: Story = {
  args: { defaultValue: 'weekly' },
  render: (args) => (
    <ChoiceCard {...args}>
      <ChoiceCardItem value="daily">Daily</ChoiceCardItem>
      <ChoiceCardItem value="weekly">Weekly</ChoiceCardItem>
      <ChoiceCardItem value="monthly">Monthly</ChoiceCardItem>
    </ChoiceCard>
  ),
};

export const Vertical: Story = { ...ThreeOptions, args: { orientation: 'vertical', defaultValue: 'weekly' } };

export const Horizontal: Story = { ...ThreeOptions, args: { orientation: 'horizontal', defaultValue: 'weekly' } };

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('company');

    return (
      <div className="flex flex-col gap-3">
        <ChoiceCard value={value} onValueChange={setValue}>
          <ChoiceCardItem value="individual">Individual</ChoiceCardItem>
          <ChoiceCardItem value="company">Company</ChoiceCardItem>
        </ChoiceCard>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

export const Invalid: Story = { args: { defaultValue: undefined, 'aria-invalid': true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledItem: Story = {
  render: (args) => (
    <ChoiceCard {...args}>
      <ChoiceCardItem value="individual">Individual</ChoiceCardItem>
      <ChoiceCardItem value="company" disabled>
        Company
      </ChoiceCardItem>
    </ChoiceCard>
  ),
};
