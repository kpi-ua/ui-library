import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib';

const alertVariants = cva(
  'group/alert relative w-full rounded-md border p-4 shadow-xs [&>svg~*]:pl-6 [&>svg~*]:pt-0.5 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:size-6 [&>svg]:left-2 [&>svg]:top-3.5 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 border-destructive bg-status-danger-300 [&>svg]:text-basic-white text-basic-white',
        success: 'border-status-success-300 bg-status-success-300 text-basic-white [&>svg]:text-basic-white',
        warning:
          'border-status-warning-300 bg-status-warning-300 text-status-warning-800 [&>svg]:text-status-warning-800',
      },
      outline: {
        true: 'shadow-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        outline: true,
        className: 'border-gray-200 bg-gray-100 text-gray-700 [&>svg]:text-gray-700',
      },
      {
        variant: 'destructive',
        outline: true,
        className: 'border-status-error-200 bg-status-error-50 text-status-error-700 [&>svg]:text-status-error-700',
      },
      {
        variant: 'success',
        outline: true,
        className:
          'border-status-success-200 bg-status-success-50 text-status-success-700 [&>svg]:text-status-success-700',
      },
      {
        variant: 'warning',
        outline: true,
        className:
          'border-status-warning-200 bg-status-warning-100/50 text-status-warning-700 [&>svg]:text-status-warning-700',
      },
    ],
    defaultVariants: {
      variant: 'default',
      outline: false,
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, outline, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    data-variant={variant ?? 'default'}
    className={cn(alertVariants({ variant, outline }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-2 leading-none font-medium tracking-tight', className)} {...props} />
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-sm text-neutral-600 group-data-[variant=destructive]/alert:text-inherit group-data-[variant=success]/alert:text-inherit group-data-[variant=warning]/alert:text-inherit [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  ),
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
