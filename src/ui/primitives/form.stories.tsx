import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './button';
import { Checkbox } from './checkbox';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './combobox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Switch } from './switch';

const meta = {
  title: 'Primitives/Form',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.email('Enter a valid email address.'),
});

type Values = z.infer<typeof schema>;

function ExampleForm({ defaultValues }: { defaultValues: Values }) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        className="grid w-80 gap-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <ExampleForm defaultValues={{ username: '', email: '' }} />,
};

export const WithErrors: Story = {
  render: () => <ExampleForm defaultValues={{ username: 'ab', email: 'invalid' }} />,
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('form')?.requestSubmit();
  },
};

const universities = ['KPI', 'Lviv Polytechnic', 'KNU', 'KNEU', 'Kharkiv Polytechnic', 'ONU'];

const plans = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

const profileSchema = z.object({
  university: z.string().min(1, 'Select a university.'),
  plan: z.enum(['free', 'pro', 'enterprise'], 'Select a plan.'),
  notifications: z.boolean(),
  terms: z.boolean().refine((value) => value, 'You must accept the terms.'),
});

type ProfileValues = z.infer<typeof profileSchema>;

function ProfileForm({ defaultValues }: { defaultValues: Partial<ProfileValues> }) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: 'onTouched',
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        className="grid w-80 gap-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <Combobox
                items={universities}
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? '')}
              >
                <FormControl>
                  <ComboboxInput placeholder="Select a university" onBlur={field.onBlur} />
                </FormControl>
                <ComboboxContent>
                  <ComboboxEmpty>No results found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <RadioGroup value={field.value ?? ''} onValueChange={field.onChange}>
                  {plans.map(({ value, label }) => (
                    <div key={value} className="flex items-center gap-2">
                      <RadioGroupItem id={`plan-${value}`} value={value} />
                      <Label htmlFor={`plan-${value}`}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-2">
              <div className="grid gap-1">
                <FormLabel>Notifications</FormLabel>
                <FormDescription>Receive updates by email.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Accept terms</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export const WithMixedControls: Story = {
  render: () => (
    <ProfileForm defaultValues={{ university: '', notifications: true, terms: false }} />
  ),
};

export const MixedControlsWithErrors: Story = {
  render: () => (
    <ProfileForm defaultValues={{ university: '', notifications: false, terms: false }} />
  ),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('form')?.requestSubmit();
  },
};
