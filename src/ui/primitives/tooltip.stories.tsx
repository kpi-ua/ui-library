import type { Meta, StoryObj } from '@storybook/react-vite';
import Info from '@/icons/Info.svg';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const sideOptions = ['top', 'right', 'bottom', 'left'] as const;

const meta = {
  title: 'Primitives/Tooltip',
  component: TooltipContent,
  args: { children: 'Tooltip text' },
  argTypes: {
    side: { control: 'select', options: sideOptions },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    sideOffset: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex min-h-40 items-center justify-center">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  render: (args) => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {sideOptions.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="secondary">{side}</Button>
          </TooltipTrigger>
          <TooltipContent {...args} side={side}>
            Tooltip on the {side}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: { children: 'More information' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" aria-label="More information" className="text-muted-foreground">
          <Info className="size-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

export const LongText: Story = {
  args: {
    children: 'This is a longer tooltip message that wraps onto several lines when it gets too wide.',
    className: 'max-w-60',
  },
};

export const DisabledTrigger: Story = {
  args: { children: 'Not available yet' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button variant="secondary" disabled className="pointer-events-none">
            Disabled
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};
