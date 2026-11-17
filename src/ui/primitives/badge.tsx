import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from 'radix-ui';

const badgeVariants = cva(
  'inline-flex items-center border-1 rounded-full px-[10px] py-[2px] text-[13px] leading-base',
  {
    variants: {
      variant: {
        red: 'bg-status-error-50 border-status-error-200 text-status-error-700',
        pink: 'bg-pink-50 border-pink-200 text-pink-700',
        purple: 'bg-purple-50 border-purple-200 text-purple-700',
        orange: 'bg-status-warning-100/50 border-status-warning-200 text-status-warning-700',
        green: 'bg-status-success-50 border-status-success-200 text-status-success-700',
        blue: 'bg-brand-100 border-brand-200 text-brand-700',
        gray: 'bg-gray-100 border-gray-200 text-gray-700',
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  },
);

function Badge({
  className,
  variant = 'gray',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
