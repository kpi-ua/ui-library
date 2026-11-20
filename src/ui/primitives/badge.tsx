import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center border-1 rounded-xs px-[10px] py-[2px] text-[13px] leading-base', {
  variants: {
    variant: {
      red: 'bg-status-danger-300 border-status-danger-300 text-basic-white',
      pink: 'bg-pink-700 border-pink-700 text-basic-white',
      purple: 'bg-purple-700 border-purple-700 text-basic-white',
      orange: 'bg-status-warning-300 border-status-warning-300 text-basic-white',
      green: 'bg-status-success-300 border-status-success-300 text-basic-white',
      blue: 'bg-brand-600 border-brand-600 text-basic-white',
      gray: 'bg-gray-600 border-gray-600 text-basic-white',
    },
    outline: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'red', outline: true, className: 'bg-status-error-50 border-status-error-200 text-status-error-700' },
    { variant: 'pink', outline: true, className: 'bg-pink-50 border-pink-200 text-pink-700' },
    { variant: 'purple', outline: true, className: 'bg-purple-50 border-purple-200 text-purple-700' },
    {
      variant: 'orange',
      outline: true,
      className: 'bg-status-warning-100/50 border-status-warning-200 text-status-warning-700',
    },
    {
      variant: 'green',
      outline: true,
      className: 'bg-status-success-50 border-status-success-200 text-status-success-700',
    },
    { variant: 'blue', outline: true, className: 'bg-brand-100 border-brand-300 text-brand-600' },
    { variant: 'gray', outline: true, className: 'bg-gray-100 border-gray-300 text-gray-700' },
  ],
  defaultVariants: {
    variant: 'gray',
    outline: false,
  },
});

function Badge({
  className,
  variant = 'gray',
  outline = false,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, outline }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
