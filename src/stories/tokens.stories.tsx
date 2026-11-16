import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colors = [
  'background',
  'foreground',
  'card',
  'popover',
  'primary',
  'secondary',
  'muted',
  'accent',
  'destructive',
  'border',
  'input',
  'ring',
];

const radii = ['sm', 'md', 'lg', 'xl'];

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {colors.map((name) => (
        <div key={name} className="space-y-1">
          <div className="h-16 rounded-md border" style={{ background: `var(--${name})` }} />
          <p className="text-xs">{name}</p>
        </div>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex gap-4">
      {radii.map((r) => (
        <div key={r} className="space-y-1">
          <div className="size-16 bg-primary" style={{ borderRadius: `var(--radius-${r})` }} />
          <p className="text-xs">{r}</p>
        </div>
      ))}
    </div>
  ),
};
