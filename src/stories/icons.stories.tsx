import type { Meta, StoryObj } from '@storybook/react-vite';
/// <reference types="vite/types/importMeta.d.ts" />
import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const modules = import.meta.glob<{ default: IconComponent }>('../icons/*.svg', { eager: true });

const icons = Object.entries(modules)
  .map(([path, mod]) => ({
    name: path.split('/').pop()!.replace('.svg', ''),
    Icon: mod.default,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const meta = {
  title: 'Foundations/Icons',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3">
      {icons.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-3">
          <Icon className="size-8" />
          <span className="w-full text-center text-xs wrap-break-word text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  ),
};
