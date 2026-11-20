import type { Meta, StoryObj } from '@storybook/react-vite';

import CopyRegular from '@/icons/CopyRegular.svg';
import EnvelopeSimple from '@/icons/EnvelopeSimple.svg';
import EyeRegular from '@/icons/EyeRegular.svg';
import MagnifyingGlassRegular from '@/icons/MagnifyingGlassRegular.svg';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group';

const meta = {
  title: 'Primitives/InputGroup',
  component: InputGroup,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search" />
      <InputGroupAddon>
        <MagnifyingGlassRegular />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Show password">
          <EyeRegular />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput type="password" defaultValue="secret" />
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const IconAndButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <EnvelopeSimple />
      </InputGroupAddon>
      <InputGroupInput defaultValue="info@example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy">
          <CopyRegular />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Textarea: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupTextarea placeholder="Write a message" />
      <InputGroupAddon align="block-end">
        <InputGroupText>0 / 280</InputGroupText>
        <InputGroupButton variant="primary" className="ml-auto">
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <MagnifyingGlassRegular />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" disabled />
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <EnvelopeSimple />
      </InputGroupAddon>
      <InputGroupInput defaultValue="not-an-email" aria-invalid />
    </InputGroup>
  ),
};
