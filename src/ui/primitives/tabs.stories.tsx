import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'Primitives/Tabs',
  component: Tabs,
  args: { defaultValue: 'account' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account details.</TabsContent>
      <TabsContent value="documents">Uploaded documents.</TabsContent>
      <TabsContent value="settings">Application settings.</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Line: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account details.</TabsContent>
      <TabsContent value="documents">Uploaded documents.</TabsContent>
      <TabsContent value="settings">Application settings.</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const VerticalLine: Story = {
  args: { orientation: 'vertical' },
  render: Line.render,
};

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents" disabled>
          Documents
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account details.</TabsContent>
      <TabsContent value="settings">Application settings.</TabsContent>
    </Tabs>
  ),
};
