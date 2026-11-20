import type { Meta, StoryObj } from '@storybook/react-vite';
import Info from '@/icons/Info.svg';
import UserCircle from '@/icons/UserCircle.svg';
import { Badge } from './badge';
import { Button } from './button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './item';

const variantOptions = ['default', 'outline', 'muted'] as const;
const sizeOptions = ['default', 'sm'] as const;

const meta = {
  title: 'Primitives/Item',
  component: Item,
  argTypes: {
    variant: { control: 'select', options: variantOptions },
    size: { control: 'select', options: sizeOptions },
  },
  decorators: [
    (Story) => (
      <div className="w-md">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Item {...args}>
      <ItemContent>
        <ItemTitle>Basic item</ItemTitle>
        <ItemDescription>A simple item with a title and a description.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="secondary" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
  ),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {variantOptions.map((v) => (
        <Item key={v} {...args} variant={v}>
          <ItemContent>
            <ItemTitle>{v}</ItemTitle>
            <ItemDescription>Item with the {v} variant.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizeOptions.map((s) => (
        <Item key={s} {...args} size={s}>
          <ItemContent>
            <ItemTitle>{s}</ItemTitle>
            <ItemDescription>Item with the {s} size.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <Info />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security alert</ItemTitle>
        <ItemDescription>New login detected from an unknown device.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="secondary" size="sm">
          Review
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const WithImage: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="image">
        <img
          src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23c6d1e4'/%3E%3C/svg%3E"
          alt=""
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Lecture recording</ItemTitle>
        <ItemDescription>Introduction to databases, 45 minutes.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const HeaderAndFooter: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args}>
      <ItemHeader>
        <ItemTitle>Application #1024</ItemTitle>
        <Badge variant="green" outline>
          Approved
        </Badge>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>Submitted on 15.01.2026 by John Doe.</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span className="text-muted-foreground text-xs">Updated 2 days ago</span>
        <Button variant="tertiary" size="sm">
          Details
        </Button>
      </ItemFooter>
    </Item>
  ),
};

export const AsLink: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Item {...args} asChild>
      <a href="#profile">
        <ItemMedia variant="icon">
          <UserCircle />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Profile</ItemTitle>
          <ItemDescription>Manage your personal information.</ItemDescription>
        </ItemContent>
      </a>
    </Item>
  ),
};

export const Group: Story = {
  render: () => (
    <ItemGroup>
      {['Passport', 'Diploma', 'Certificate'].map((name, index, all) => (
        <div key={name}>
          <Item>
            <ItemMedia variant="icon">
              <Info />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>Uploaded document.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="tertiary" size="sm">
                View
              </Button>
            </ItemActions>
          </Item>
          {index < all.length - 1 && <ItemSeparator />}
        </div>
      ))}
    </ItemGroup>
  ),
};
