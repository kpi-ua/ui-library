import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { fn } from 'storybook/test';

import { MultiSelect, type MultiSelectOption } from './multi-select';

const universities: MultiSelectOption<string>[] = [
  { label: 'KPI', value: 'kpi' },
  { label: 'Lviv Polytechnic', value: 'lviv' },
  { label: 'KNU', value: 'knu' },
  { label: 'KNEU', value: 'kneu' },
  { label: 'Kharkiv Polytechnic', value: 'kharkiv' },
  { label: 'ONU', value: 'onu' },
];

const statuses: MultiSelectOption<string>[] = [
  { label: 'Approved', value: 'approved', badgeVariant: 'green' },
  { label: 'Pending', value: 'pending', badgeVariant: 'orange' },
  { label: 'Rejected', value: 'rejected', badgeVariant: 'red' },
  { label: 'Draft', value: 'draft', badgeVariant: 'gray' },
  { label: 'In review', value: 'review', badgeVariant: 'blue' },
  { label: 'Archived', value: 'archived', badgeVariant: 'purple' },
  { label: 'Flagged', value: 'flagged', badgeVariant: 'pink' },
];

const meta = {
  title: 'Composed/MultiSelect',
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: [
          'A particular composition of the `Combobox` primitive with a simpler API for working with multiple selected items.',
          '',
          'Instead of assembling `Combobox`, `ComboboxChips`, `ComboboxChip`, `ComboboxContent` and `ComboboxItem` by hand, pass a list of `options` together with the `selected` values and an `onChange` callback that receives the new array of values.',
          '',
          'Each option can configure how its chip looks through `badgeVariant`, which accepts any `Badge` color (`red`, `pink`, `purple`, `orange`, `green`, `blue`, `gray`). Options without `badgeVariant` use `gray`.',
          '',
          'Use `maxDisplayedItems` to limit how many chips are shown before the rest are collapsed.',
        ].join('\n'),
      },
    },
  },
  args: {
    options: universities,
    selected: [],
    onChange: fn(),
  },
  argTypes: {
    options: { control: 'object' },
    selected: { control: 'object' },
    placeholder: { control: 'text' },
    noResultsPlaceholder: { control: 'text' },
    disabled: { control: 'boolean' },
    maxDisplayedItems: { control: 'number' },
  },
  render: function Render(args) {
    const [selected, setSelected] = React.useState<string[]>(args.selected);

    return (
      <div className="w-96">
        <MultiSelect
          {...args}
          selected={selected}
          onChange={(values) => {
            setSelected(values);
            args.onChange(values);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedValues: Story = {
  args: { selected: ['kpi', 'lviv'] },
};

export const BadgeColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set `badgeVariant` on an option to change the color of its chip.',
      },
    },
  },
  args: {
    options: statuses,
    selected: ['approved', 'pending', 'rejected'],
    maxDisplayedItems: 7,
  },
};

export const MaxDisplayedItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Only the first `maxDisplayedItems` chips are shown; the rest are collapsed.',
      },
    },
  },
  args: {
    selected: ['kpi', 'lviv', 'knu', 'kneu', 'kharkiv'],
    maxDisplayedItems: 2,
  },
};

export const CustomPlaceholders: Story = {
  args: {
    placeholder: 'Choose universities',
    noResultsPlaceholder: 'Nothing matches your search',
  },
};

export const Disabled: Story = {
  args: { selected: ['kpi', 'lviv'], disabled: true },
};
