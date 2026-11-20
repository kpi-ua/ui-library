import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'Primitives/Label',
  component: Label,
  args: { children: 'Email' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="label-email" {...args} />
      <Input id="label-email" type="email" placeholder="name@kpi.ua" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  args: { children: 'Accept terms' },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms" />
      <Label htmlFor="label-terms" {...args} />
    </div>
  ),
};

/** A label placed after a disabled control with the `peer` class dims itself. */
export const DisabledPeer: Story = {
  args: { children: 'Accept terms' },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms-disabled" className="peer" disabled />
      <Label htmlFor="label-terms-disabled" {...args} />
    </div>
  ),
};

/** Inside a `group` with `data-disabled="true"`, the label dims and ignores pointer events. */
export const DisabledGroup: Story = {
  render: (args) => (
    <div className="group grid w-72 gap-2" data-disabled="true">
      <Label htmlFor="label-email-disabled" {...args} />
      <Input id="label-email-disabled" type="email" placeholder="name@kpi.ua" disabled />
    </div>
  ),
};
