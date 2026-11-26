'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import { Label } from '../primitives/label';
import { RadioGroup, RadioGroupItem } from '../primitives/radio-group';

// Without `orientation`, cards stack on small screens and sit in a row from `md` up.
function ChoiceCard({ className, orientation, ...props }: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup
      orientation={orientation}
      className={cn(
        'w-full gap-4',
        orientation === 'vertical' && 'flex flex-col [&>*]:flex-none',
        orientation === 'horizontal' && 'flex flex-row gap-8 [&>*]:flex-1',
        !orientation && 'md:flex md:flex-row md:gap-8',
        className,
      )}
      {...props}
    />
  );
}

// `className` styles the card; all other props go to the radio item.
function ChoiceCardItem({ children, className, ...props }: React.ComponentProps<typeof RadioGroupItem>) {
  return (
    <Label
      className={cn(
        'relative h-12 w-full cursor-pointer text-muted-foreground rounded-sm border border-gray-300 px-4 shadow-xs transition-[color,box-shadow] md:flex-1',
        'has-data-[state=checked]:bg-accent has-data-[state=checked]:text-accent-foreground has-data-[state=checked]:border-basic-blue has-data-[state=checked]:ring-1 has-data-[state=checked]:ring-basic-blue',
        'has-focus-visible:border-brand-500 has-focus-visible:ring-1 has-focus-visible:ring-brand-500',
        'in-aria-invalid:border-destructive/60 in-aria-invalid:ring-1 in-aria-invalid:ring-destructive/60',
        'has-disabled:cursor-not-allowed has-disabled:opacity-50',
        className,
      )}
    >
      <RadioGroupItem {...props} />
      <span className="text-sm font-medium">{children}</span>
    </Label>
  );
}

export { ChoiceCard, ChoiceCardItem };
