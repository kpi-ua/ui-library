import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const weights = [
  ['font-normal', '400'],
  ['font-medium', '500'],
  ['font-semibold', '600'],
  ['font-bold', '700'],
] as const;

export const Exo2: Story = {
  render: () => (
    <div className="space-y-4">
      {weights.map(([cls, weight]) => (
        <div key={cls}>
          <p className="text-xs text-muted-foreground">{weight}</p>
          <p className={`${cls} text-2xl`}>The quick brown fox jumps over the lazy dog</p>
          <p className={`${cls} text-2xl`}>Щасливої дороги, їжак, гуцул і щеня — 0123456789</p>
        </div>
      ))}
    </div>
  ),
};
