import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from './combobox';

const meta = {
  title: 'Primitives/Combobox',
  component: Combobox,
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const universities = ['KPI', 'Lviv Polytechnic', 'KNU', 'KNEU', 'Kharkiv Polytechnic', 'ONU'];

export const Default: Story = {
  render: () => (
    <Combobox items={universities}>
      <ComboboxInput placeholder="Select a university" />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const WithClear: Story = {
  render: () => (
    <Combobox items={universities} defaultValue="KPI">
      <ComboboxInput placeholder="Select a university" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

const groups = [
  { label: 'Kyiv', items: ['KPI', 'KNU', 'KNEU'] },
  { label: 'Other cities', items: ['Lviv Polytechnic', 'Kharkiv Polytechnic', 'ONU'] },
];

export const Grouped: Story = {
  render: () => (
    <Combobox items={groups}>
      <ComboboxInput placeholder="Select a university" />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof groups)[number]) => (
            <ComboboxGroup key={group.label} items={group.items}>
              <ComboboxLabel>{group.label}</ComboboxLabel>
              {group.items.map((item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Combobox items={universities}>
      <ComboboxInput placeholder="Select a university" disabled />
    </Combobox>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Combobox items={universities}>
      <ComboboxInput placeholder="Select a university" aria-invalid="true" />
    </Combobox>
  ),
};

const chipVariants: Record<string, ComponentProps<typeof ComboboxChip>['variant']> = {
  KPI: 'blue',
  'Lviv Polytechnic': 'green',
  KNU: 'purple',
  KNEU: 'orange',
  'Kharkiv Polytechnic': 'red',
  ONU: 'pink',
};

function MultipleExample(chipsProps: ComponentProps<typeof ComboboxChips>) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox multiple items={universities} defaultValue={['KPI', 'KNU']}>
      <ComboboxChips ref={anchor} {...chipsProps}>
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value} variant={chipVariants[value]}>
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add university" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const Multiple: Story = {
  render: () => <MultipleExample />,
};

export const MultipleNoWrap: Story = {
  render: () => <MultipleExample wrap={false} maxDisplayedItems={3} />,
};

export const MultipleNoWrapCustomPlaceholder: Story = {
  render: () => <MultipleExample wrap={false} maxDisplayedItems={2} remainingPlaceholder={(n) => `and ${n} more`} />,
};
