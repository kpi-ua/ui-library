'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/ui/primitives/button';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/ui/primitives/input-group';

import { badgeVariants } from './badge';

const Combobox = ComboboxPrimitive.Root;

type ComboboxChipsConfig = {
  wrap: boolean;
  maxDisplayedItems: number;
  remainingPlaceholder?: (remainder: number) => string;
};

const ComboboxChipsContext = React.createContext<ComboboxChipsConfig | null>(null);

// Number of selected items hidden by `maxDisplayedItems` when `wrap` is false.
const ComboboxChipsOverflowContext = React.createContext(0);

function ComboboxValue({ children, ...props }: ComboboxPrimitive.Value.Props) {
  const chips = React.useContext(ComboboxChipsContext);

  if (!chips || chips.wrap || typeof children !== 'function') {
    return (
      <ComboboxPrimitive.Value data-slot="combobox-value" {...props}>
        {children}
      </ComboboxPrimitive.Value>
    );
  }

  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" {...props}>
      {(values: unknown) => {
        const remainder = Array.isArray(values) ? Math.max(0, values.length - chips.maxDisplayedItems) : 0;
        return (
          <ComboboxChipsOverflowContext.Provider value={remainder}>
            {children(remainder > 0 ? (values as unknown[]).slice(0, chips.maxDisplayedItems) : values)}
          </ComboboxChipsOverflowContext.Provider>
        );
      }}
    </ComboboxPrimitive.Value>
  );
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon data-slot="combobox-trigger-icon" className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="tertiary" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup
      className={cn(
        'w-auto has-[[data-slot=input-group-control]:focus-visible]:border-brand-500 has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot=input-group-control]:focus-visible]:ring-brand-500',
        className,
      )}
    >
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="tertiary"
            asChild
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            'group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+(--spacing(7)))] origin-(--transform-origin) overflow-hidden rounded-sm bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none',
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        'max-h-[min(calc(--spacing(96)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0',
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />}
      >
        <CheckIcon className="pointer-events-none size-4 pointer-coarse:size-5" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />;
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        'px-2 py-1.5 text-xs text-muted-foreground pointer-coarse:px-3 pointer-coarse:py-2 pointer-coarse:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        'hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex',
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  wrap = true,
  maxDisplayedItems = 3,
  remainingPlaceholder,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props &
  Partial<ComboboxChipsConfig>) {
  const config = React.useMemo(
    () => ({ wrap, maxDisplayedItems, remainingPlaceholder }),
    [wrap, maxDisplayedItems, remainingPlaceholder],
  );

  return (
    <ComboboxChipsContext.Provider value={config}>
      <ComboboxPrimitive.Chips
        data-slot="combobox-chips"
        className={cn(
          'flex min-h-9 items-center gap-1.5 rounded-sm border border-gray-300 bg-transparent bg-clip-padding px-1 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 has-aria-invalid:border-destructive/60 has-aria-invalid:ring-1 has-aria-invalid:ring-destructive/60 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:bg-gray-50 has-data-[slot=combobox-chip]:px-1.5 dark:has-aria-invalid:border-destructive/60 dark:has-aria-invalid:ring-destructive/60',
          wrap ? 'flex-wrap' : 'flex-nowrap overflow-hidden',
          className,
        )}
        {...props}
      />
    </ComboboxChipsContext.Provider>
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  variant = 'gray',
  ...props
}: ComboboxPrimitive.Chip.Props &
  VariantProps<typeof badgeVariants> & {
    showRemove?: boolean;
  }) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      data-variant={variant}
      className={cn(
        badgeVariants({ variant, outline: true }),
        'w-fit max-w-full min-w-0 justify-center gap-1 py-0 text-xs whitespace-nowrap has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-1 data-disabled:cursor-not-allowed data-disabled:border-gray-300 data-disabled:bg-gray-100 data-disabled:text-gray-500',
        className,
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={
            <Button
              variant="tertiary"
              className="px-0.5 py-0.5 text-inherit active:text-inherit! enabled:hover:bg-transparent enabled:hover:text-inherit! disabled:text-inherit"
              size="sm"
            />
          }
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showClear?: boolean;
}) {
  const chips = React.useContext(ComboboxChipsContext);
  const remainder = React.useContext(ComboboxChipsOverflowContext);

  return (
    <>
      {remainder > 0 && (
        <span
          data-slot="combobox-chip-overflow"
          className={cn(
            badgeVariants({ variant: 'gray', outline: true }),
            'shrink-0 min-h-6 py-0 text-xs whitespace-nowrap',
          )}
        >
          {chips?.remainingPlaceholder?.(remainder) ?? `+${remainder}`}
        </span>
      )}
      <ComboboxPrimitive.Input
        data-slot="combobox-chip-input"
        className={cn(
          'min-w-16 flex-1 pl-2 outline-none disabled:cursor-not-allowed disabled:text-gray-500 disabled:placeholder:text-gray-400 [[data-slot=combobox-chip]~&]:pl-0',
          className,
        )}
        {...props}
      />
      {showClear && <ComboboxClear className="shrink-0" disabled={props.disabled} />}
    </>
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
