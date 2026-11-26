'use client';

import { format, isValid, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { Matcher } from 'react-day-picker';

import { cn } from '@/lib';

import { Button } from '../primitives/button';
import { Calendar } from '../primitives/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/popover';

const DATE_ONLY_PREFIX_REGEX = /^\d{4}-\d{2}-\d{2}/;
const API_DATE_FORMAT = 'yyyy-MM-dd';

/**
 * Normalizes a calendar-only value to a plain 'YYYY-MM-DD' string.
 *
 * Date-only values must never travel as `Date` instants: an instant re-read in another
 * timezone (browser vs server, or an applicant abroad) lands on a different calendar day.
 * Strings keep the leading 'YYYY-MM-DD' as-is (the API's DateOnly serialization, so an ISO
 * timestamp keeps its UTC calendar day); a `Date` is read by its local Y/M/D, which is
 * correct for the only `Date` source left — the date picker's local-midnight selection.
 */
export const toDateOnlyString = (value: Date | string): string => {
  if (typeof value === 'string') {
    const match = DATE_ONLY_PREFIX_REGEX.exec(value);

    if (match) {
      return match[0];
    }
  }

  const date = new Date(value);

  return isValid(date) ? format(date, API_DATE_FORMAT) : '';
};

export const parseDateOnly = (value: string): Date | undefined => {
  const parsed = parse(toDateOnlyString(value), API_DATE_FORMAT, new Date());

  return isValid(parsed) ? parsed : undefined;
};

export const todayDateOnly = (): string => format(new Date(), API_DATE_FORMAT);

interface DatePickerProps extends Pick<React.ComponentProps<'button'>, 'id' | 'aria-invalid' | 'aria-describedby'> {
  // Calendar-only 'YYYY-MM-DD' string; Date objects never cross this boundary so the
  // value cannot drift a day when browser and server sit in different timezones.
  value?: string | null;
  onChange?: (date: string | undefined) => void;
  onBlur?: () => void;
  hidden?: Matcher | Matcher[] | undefined;
  dateDisabled?: Matcher | Matcher[] | undefined;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  asInputGroupControl?: boolean;
}

export function DatePicker({
  value,
  onChange,
  onBlur,
  hidden,
  placeholder,
  disabled = false,
  dateDisabled,
  className,
  asInputGroupControl = false,
  ...props
}: DatePickerProps) {
  const selected = value ? parseDateOnly(value) : undefined;
  const formatted = selected ? format(selected, 'dd.MM.y') : '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          data-empty={!value}
          data-slot={asInputGroupControl ? 'input-group-control' : undefined}
          onBlur={onBlur}
          disabled={disabled}
          {...props}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary hover:bg-background! selection:text-primary-foreground h-10 w-full min-w-0 rounded-sm border border-gray-300 bg-basic-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 md:text-sm',
            'focus-visible:ring-brand-500 focus-visible:border-brand-500 focus-visible:ring-1',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            'data-[empty=true]:text-muted-foreground justify-start text-left font-normal',
            asInputGroupControl &&
              'rounded-none border-0 border-transparent! bg-transparent! shadow-none ring-offset-0 focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-transparent! dark:bg-transparent',
            className,
          )}
        >
          <CalendarIcon />
          {formatted || <span className="text-muted-foreground">{placeholder || 'Pick a date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selected}
          defaultMonth={selected}
          onDayBlur={onBlur}
          onSelect={(date) => onChange?.(date ? toDateOnlyString(date) : undefined)}
          className="rounded-md"
          disabled={dateDisabled}
          hidden={hidden}
        />
      </PopoverContent>
    </Popover>
  );
}
