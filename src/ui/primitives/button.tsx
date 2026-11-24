import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { Slottable } from 'radix-ui/slot';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Spinner } from '../../icons';

const buttonVariants = cva(
  'inline-flex cursor-pointer shadow-xs items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold border border-solid border-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-primary-foreground! enabled:hover:bg-brand-700 active:bg-brand-700 active:outline-brand-900 disabled:opacity-40 focus-visible:ring-brand-600 ',
        black:
          'bg-basic-black text-basic-white! enabled:hover:bg-neutral-800 active:bg-neutral-900 disabled:opacity-40 focus-visible:ring-basic-black',
        warning:
          'bg-status-warning-500 text-basic-white! enabled:hover:bg-status-warning-600 active:bg-status-warning-600 disabled:opacity-40 focus-visible:ring-status-warning-500',
        secondary:
          'bg-basic-white text-gray-700 border-gray-300 enabled:hover:bg-gray-50 disabled:bg-basic-white disabled:border-gray-200 disabled:text-gray-400 focus-visible:ring-brand-600',
        tertiary:
          'text-neutral-600 enabled:hover:bg-neutral-50 enabled:hover:!text-neutral-900 active:text-neutral-900 active:bg-transparent disabled:text-neutral-400 shadow-none focus-visible:ring-neutral-600',
        destructive:
          'bg-status-error-600! text-primary-foreground! enabled:hover:bg-status-error-700! disabled:opacity-40 focus-visible:ring-status-error-600',
      },
      size: {
        sm: "py-[7px] px-[14px] text-base [&_svg:not([class*='size-'])]:size-[16px] leading-base",
        md: "py-[9px] px-[14px] text-base [&_svg:not([class*='size-'])]:size-[20px] leading-base",
        lg: "py-[9px] px-[16px] text-lg [&_svg:not([class*='size-'])]:size-[24px] leading-lg",
        xl: "py-[11px] px-[18px] text-lg [&_svg:not([class*='size-'])]:size-[24px] leading-lg",
      },
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'sm', iconOnly: true, className: 'p-[7px]' },
      { size: 'md', iconOnly: true, className: 'p-[9px]' },
      { size: 'lg', iconOnly: true, className: 'p-[9px]' },
      { size: 'xl', iconOnly: true, className: 'p-[11px]' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
);

type IconPosition = 'start' | 'end';

export interface ButtonProps
  extends React.ComponentProps<'button'>, Omit<VariantProps<typeof buttonVariants>, 'iconOnly'> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

function Button({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  loading = false,
  icon,
  iconPosition = 'start',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const iconOnly = !children && !!(icon || loading);

  const iconAtPosition = (position: IconPosition) => {
    if (loading) {
      return position === 'start' ? <Spinner /> : null;
    }

    return icon && position === iconPosition ? icon : null;
  };

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, iconOnly, className }))}
      disabled={loading ? true : disabled}
      {...props}
    >
      {iconAtPosition('start')}
      <Slottable>{children}</Slottable>
      {iconAtPosition('end')}
    </Comp>
  );
}

export { Button, buttonVariants };
