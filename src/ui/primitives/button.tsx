import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from 'radix-ui';

const buttonVariants = cva(
  'inline-flex cursor-pointer shadow-xs items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold border border-solid border-transparent ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-primary-foreground! enabled:hover:bg-brand-700 active:bg-brand-700 active:outline-brand-900 disabled:opacity-40',
        black:
          'bg-basic-black text-basic-white! enabled:hover:bg-neutral-800 active:bg-neutral-900 disabled:opacity-40',
        warning:
          'bg-status-warning-500 text-basic-white! enabled:hover:bg-status-warning-400 active:bg-status-warning-600 disabled:opacity-40',
        secondary:
          'bg-basic-white text-gray-700 border-gray-300 enabled:hover:bg-gray-50 disabled:bg-basic-white disabled:border-gray-200 disabled:text-gray-400',
        tertiary:
          'text-neutral-600 enabled:hover:bg-neutral-50 enabled:hover:!text-neutral-900 active:text-neutral-900 active:bg-transparent disabled:text-neutral-400 shadow-none',
        destructive:
          'bg-status-error-600! text-primary-foreground! enabled:hover:bg-status-error-700! disabled:opacity-40',
      },
      size: {
        sm: 'py-[8px] px-[12px] text-sm [&_svg]:size-[16px] leading-xs',
        md: 'py-[10px] px-[14px] text-base [&_svg]:size-[20px] leading-base',
        lg: 'py-[10px] px-[18px] text-base [&_svg]:size-[24px] leading-lg',
        xl: 'py-[12px] px-[18px] text-base [&_svg]:size-[24px] leading-lg',
        // icon: 'p-[10px] [&_svg]:size-[16px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type IconPosition = 'start' | 'end';

export interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
