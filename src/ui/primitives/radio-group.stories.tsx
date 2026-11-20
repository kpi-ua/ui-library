import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';

const meta = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  args: { defaultValue: 'comfortable' },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {options.map(({ value, label }) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem id={`density-${value}`} value={value} />
          <Label htmlFor={`density-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup className="grid-flow-col" {...args}>
      {options.map(({ value, label }) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem id={`horizontal-${value}`} value={value} />
          <Label htmlFor={`horizontal-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const DisabledGroup: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const DisabledItem: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {options.map(({ value, label }) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem id={`item-${value}`} value={value} disabled={value === 'compact'} />
          <Label htmlFor={`item-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
