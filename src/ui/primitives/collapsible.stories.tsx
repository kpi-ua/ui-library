import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronsUpDownIcon } from 'lucide-react';

import { Button } from './button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Collapsible className="flex flex-col gap-2" {...args}>
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">3 items starred</h4>
        <CollapsibleTrigger asChild>
          <Button variant="tertiary" size="sm" icon={<ChevronsUpDownIcon />} aria-label="Toggle" />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-sm border px-4 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-sm border px-4 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-sm border px-4 py-2 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultOpen: Story = { args: { defaultOpen: true } };

export const Disabled: Story = { args: { disabled: true } };
