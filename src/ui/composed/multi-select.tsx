import type { VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '../primitives/combobox';

export interface MultiSelectOption<T extends string | number> {
  label: string;
  value: T;
  disabled?: boolean;
  badgeVariant?: VariantProps<typeof ComboboxChip>['variant'];
}

interface MultiSelectProps<T extends string | number> {
  options: MultiSelectOption<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  placeholder?: string;
  noResultsPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  maxDisplayedItems?: number;
}

export const MultiSelect = <T extends string>({
  options,
  selected,
  onChange,
  placeholder = 'Search...',
  noResultsPlaceholder = 'No results found.',
  className,
  disabled = false,
  maxDisplayedItems = 3,
}: MultiSelectProps<T>) => {
  const anchor = useComboboxAnchor();

  const selectedObjects = useMemo(() => options.filter(({ value }) => selected.includes(value)), [options, selected]);

  const handleValueChange = (values: MultiSelectOption<T>[]) => {
    onChange(values.map(({ value }) => value));
  };

  return (
    <Combobox
      multiple
      items={options}
      itemToStringLabel={(item) => item.label}
      itemToStringValue={(item) => item.value}
      isItemEqualToValue={(itemValue, value) => itemValue.value === value.value}
      onValueChange={handleValueChange}
      value={selectedObjects}
      disabled={disabled}
    >
      <ComboboxChips className={className} ref={anchor} wrap={false} maxDisplayedItems={maxDisplayedItems}>
        <ComboboxValue>
          {(values: MultiSelectOption<T>[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value.value} variant={value.badgeVariant || 'gray'}>
                  {value.label}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={placeholder} showClear />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{noResultsPlaceholder}</ComboboxEmpty>
        <ComboboxList>
          {(item: MultiSelectOption<T>) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
