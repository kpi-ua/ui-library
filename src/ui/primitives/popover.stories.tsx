import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const sideOptions = ['top', 'right', 'bottom', 'left'] as const;
const alignOptions = ['start', 'center', 'end'] as const;

const meta = {
  title: 'Primitives/Popover',
  component: PopoverContent,
  argTypes: {
    side: { control: 'select', options: sideOptions },
    align: { control: 'select', options: alignOptions },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-72 items-center justify-center">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  render: (args) => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {sideOptions.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="secondary">{side}</Button>
          </PopoverTrigger>
          <PopoverContent {...args} side={side}>
            <PopoverDescription>Popover on the {side} side.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const Alignments: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {alignOptions.map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="secondary">{align}</Button>
          </PopoverTrigger>
          <PopoverContent {...args} align={align}>
            <PopoverDescription>Aligned to the {align}.</PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Edit dimensions</Button>
      </PopoverTrigger>
      <PopoverContent {...args} className="w-80">
        <div className="grid gap-4">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="popover-width">Width</Label>
              <Input id="popover-width" defaultValue="100%" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="popover-height">Height</Label>
              <Input id="popover-height" defaultValue="25px" className="col-span-2" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithAnchor: Story = {
  render: (args) => (
    <Popover defaultOpen>
      <PopoverAnchor asChild>
        <div className="w-64 rounded-md border border-dashed p-4 text-sm">Anchor element</div>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="ml-4">
          Trigger
        </Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <PopoverDescription>Positioned relative to the anchor, not the trigger.</PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
};
