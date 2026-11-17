import { useCallback, useState, type ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Heading0,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from './headers';

const meta = {
  title: 'Typography/Headings',
  component: Heading1,
  parameters: { layout: 'padded' },
  args: { children: 'The quick brown fox jumps over the lazy dog' },
} satisfies Meta<typeof Heading1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

type HeadingComponent = ComponentType<{
  ref?: (el: HTMLHeadingElement | null) => void;
  children?: string;
}>;

const headings: { name: string; tag: string; Component: HeadingComponent }[] = [
  { name: 'Heading0', tag: 'h1', Component: Heading0 },
  { name: 'Heading1', tag: 'h1', Component: Heading1 },
  { name: 'Heading2', tag: 'h2', Component: Heading2 },
  { name: 'Heading3', tag: 'h3', Component: Heading3 },
  { name: 'Heading4', tag: 'h4', Component: Heading4 },
  { name: 'Heading5', tag: 'h5', Component: Heading5 },
  { name: 'Heading6', tag: 'h6', Component: Heading6 },
];

const PROPS = ['font-size', 'line-height', 'font-weight'];

// Reads resolved values from the rendered element, so they follow the current viewport.
function useComputed() {
  const [values, setValues] = useState<string[]>([]);
  const ref = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const style = getComputedStyle(el);
    const next = PROPS.map((p) => style.getPropertyValue(p));
    setValues((prev) => (prev.join() === next.join() ? prev : next));
  }, []);
  return [ref, values] as const;
}

function HeadingRow({
  name,
  Component,
  children,
}: {
  name: string;
  tag: string;
  Component: HeadingComponent;
  children: string;
}) {
  const [ref, [size, leading, weight]] = useComputed();

  return (
    <div className="grid grid-cols-[11rem_1fr] items-center gap-6 border-b border-neutral-divider py-4">
      <div className="space-y-1">
        <p className="text-base font-semibold">&lt;{name} /&gt;</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-2 text-xs text-muted-foreground">
          <dt><strong>Size</strong></dt>
          <dd>{size}</dd>
          <dt><strong>Line height</strong></dt>
          <dd>{leading}</dd>
          <dt><strong>Weight</strong></dt>
          <dd>{weight}</dd>
        </dl>
      </div>
      <Component ref={ref}>{children}</Component>
    </div>
  );
}

export const Scale: Story = {
  render: ({ children }) => (
    <div>
      <p className="pb-4 text-sm text-muted-foreground">
        Sizes switch at the <code className="font-mono">lg</code> breakpoint; values below reflect
        the current viewport.
      </p>
      <div className="border-t border-neutral-divider">
        {headings.map((heading) => (
          <HeadingRow key={heading.name} {...heading}>
            {children as string}
          </HeadingRow>
        ))}
      </div>
    </div>
  ),
};
