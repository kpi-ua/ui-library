import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ColorFn = 'rgb' | 'hsl';
type ColorToken = { name: string; fn: ColorFn };

const tokens = (fn: ColorFn, names: string[]): ColorToken[] => names.map((name) => ({ name, fn }));
const scale = (prefix: string, steps: (string | number)[]) => steps.map((s) => `${prefix}-${s}`);

// Mirrors the variables declared in :root of theme.css.
const colorGroups: { title: string; items: ColorToken[] }[] = [
  {
    title: 'Semantic',
    items: [
      ...tokens('hsl', [
        'background',
        'foreground',
        'card',
        'card-foreground',
        'popover',
        'popover-foreground',
        'muted',
        'muted-foreground',
        'secondary',
        'secondary-foreground',
        'accent',
        'accent-foreground',
        'primary-foreground',
        'destructive-foreground',
        'border',
        'input',
        'ring',
      ]),
      ...tokens('rgb', ['primary', 'destructive']),
    ],
  },
  {
    title: 'Basic',
    items: tokens('rgb', ['uncategorized-main', 'basic-black', 'basic-blue', 'basic-white', 'basic-grey', 'grey-50']),
  },
  {
    title: 'Brand',
    items: tokens('rgb', scale('brand', [900, 800, 700, 600, 500, 400, 300, 200, 100, '00'])),
  },
  {
    title: 'Neutral',
    items: tokens('rgb', ['neutral-divider', ...scale('neutral', [900, 800, 700, 600, 500, 400, 300, 200, 100, 50])]),
  },
  {
    title: 'Pink',
    items: tokens('rgb', scale('pink', [50, 200, 700])),
  },
  {
    title: 'Purple',
    items: tokens('rgb', scale('purple', [50, 200, 700])),
  },
  {
    title: 'Status / danger',
    items: tokens('rgb', scale('status-danger', [300, 200, 100])),
  },
  {
    title: 'Status / warning',
    items: tokens('rgb', scale('status-warning', [800, 700, 600, 500, 400, 300, 200, 100, 50])),
  },
  {
    title: 'Status / success',
    items: tokens('rgb', scale('status-success', [700, 600, 300, 200, 100, 50])),
  },
  {
    title: 'Status / error',
    items: tokens('rgb', scale('status-error', [50, 100, 200, 600, 700])),
  },
  {
    title: 'Other',
    items: tokens(
      'rgb',
      ['purple', 'red', 'orange', 'blue'].flatMap((c) => [`other-${c}`, `other-${c}-10`]),
    ),
  },
  {
    title: 'Sidebar',
    items: tokens('hsl', [
      'sidebar-background',
      'sidebar-foreground',
      'sidebar-primary',
      'sidebar-primary-foreground',
      'sidebar-border',
      'sidebar-ring',
    ]),
  },
];

// Channel lists may carry a 4th alpha value, e.g. "148 157 255 0.1".
function toColor(fn: ColorFn, value: string) {
  const parts = value.split(/\s+/);
  return parts.length === 4 ? `${fn}(${parts[0]} ${parts[1]} ${parts[2]} / ${parts[3]})` : `${fn}(${value})`;
}

function Swatch({ name, fn }: ColorToken) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();

  return (
    <div className="space-y-1">
      <div className="overflow-hidden rounded-md border bg-[conic-gradient(#e5e7eb_25%,#fff_0_50%,#e5e7eb_0_75%,#fff_0)] bg-size-[12px_12px]">
        <div className="h-16" style={{ background: value ? toColor(fn, value) : 'transparent' }} />
      </div>
      <p className="text-xs font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">{value || 'not defined'}</p>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      {colorGroups.map(({ title, items }) => (
        <section key={title} className="space-y-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-4">
            {items.map((item) => (
              <Swatch key={item.name} {...item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

// Reads resolved values from the rendered element so labels always match theme.css.
function useComputed(props: string[]) {
  const [values, setValues] = useState<string[]>([]);
  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (!el) {
        return;
      }
      const style = getComputedStyle(el);
      const next = props.map((p) => style.getPropertyValue(p));
      setValues((prev) => (prev.join() === next.join() ? prev : next));
    },
    [props],
  );
  return [ref, values] as const;
}

// Full class names are listed so Tailwind can detect them.
const spacing = [
  ['1', 'w-1'],
  ['2', 'w-2'],
  ['3', 'w-3'],
  ['4', 'w-4'],
  ['6', 'w-6'],
  ['8', 'w-8'],
  ['12', 'w-12'],
  ['16', 'w-16'],
  ['24', 'w-24'],
] as const;

const WIDTH = ['width'];

function SpacingRow({ step, cls }: { step: string; cls: string }) {
  const [ref, [width]] = useComputed(WIDTH);
  return (
    <div className="flex items-center gap-4">
      <span className="w-12 text-xs font-medium">{step}</span>
      <div ref={ref} className={`${cls} h-4 rounded-xs bg-brand-600`} />
      <span className="text-xs text-muted-foreground">{width}</span>
    </div>
  );
}

export const Spacing: Story = {
  render: () => (
    <div className="space-y-2">
      {spacing.map(([step, cls]) => (
        <SpacingRow key={step} step={step} cls={cls} />
      ))}
    </div>
  ),
};

const textSizes = [
  ['xs', 'text-xs leading-xs'],
  ['sm', 'text-sm leading-sm'],
  ['base', 'text-base leading-base'],
  ['lg', 'text-lg leading-lg'],
  ['xl', 'text-xl leading-xl'],
  ['2xl', 'text-2xl leading-2xl'],
  ['3xl', 'text-3xl leading-3xl'],
  ['4xl', 'text-4xl leading-4xl'],
  ['5xl', 'text-5xl leading-5xl'],
  ['6xl', 'text-6xl leading-6xl'],
  ['7xl', 'text-7xl leading-7xl'],
] as const;

const TEXT_PROPS = ['font-size', 'line-height'];

function TextSizeRow({ name, cls }: { name: string; cls: string }) {
  const [ref, [size, leading]] = useComputed(TEXT_PROPS);
  return (
    <div className="flex items-baseline gap-4 border-b pb-2">
      <div className="w-28 shrink-0">
        <p className="text-xs font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">
          {size} / {leading}
        </p>
      </div>
      <p ref={ref} className={cls}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

export const FontSizes: Story = {
  render: () => (
    <div className="space-y-2">
      {textSizes.map(([name, cls]) => (
        <TextSizeRow key={name} name={name} cls={cls} />
      ))}
    </div>
  ),
};

const radii = [
  ['xs', 'rounded-xs'],
  ['sm', 'rounded-sm'],
  ['md', 'rounded-md'],
  ['lg', 'rounded-lg'],
  ['xl', 'rounded-xl'],
] as const;

const RADIUS = ['border-top-left-radius'];

function RadiusItem({ name, cls }: { name: string; cls: string }) {
  const [ref, [radius]] = useComputed(RADIUS);
  return (
    <div className="space-y-1">
      <div ref={ref} className={`${cls} size-20 bg-brand-600`} />
      <p className="text-xs font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">{radius}</p>
    </div>
  );
}

export const Radii: Story = {
  render: () => (
    <div className="flex gap-6">
      {radii.map(([name, cls]) => (
        <RadiusItem key={name} name={name} cls={cls} />
      ))}
    </div>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div className="space-y-1">
      <p className="text-xs font-medium">3xl</p>
      <p className="text-xs text-muted-foreground">1920px — use as `3xl:` variant</p>
    </div>
  ),
};
