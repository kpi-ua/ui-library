import * as React from 'react';

import { cn } from '@/lib';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-10 w-full min-w-0 rounded-sm border border-gray-300 bg-background px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 md:text-sm',
        'focus-visible:ring-brand-500 focus-visible:border-brand-500 focus-visible:ring-1',
        'aria-invalid:border-destructive/60 aria-invalid:ring-1 aria-invalid:ring-destructive/60',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
