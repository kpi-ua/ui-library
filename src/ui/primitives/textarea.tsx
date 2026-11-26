import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-sm border border-gray-300 bg-background px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-gray-50 md:text-sm',
        'focus-visible:border-brand-500 focus-visible:ring-1 focus-visible:ring-brand-500',
        'aria-invalid:border-destructive/60 aria-invalid:ring-1 aria-invalid:ring-destructive/60',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
