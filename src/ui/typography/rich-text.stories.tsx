import type { Meta, StoryObj } from '@storybook/react-vite';

import RichText from './rich-text';

const meta = {
  title: 'Typography/RichText',
  component: RichText,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Tag renderers match the shape of i18n rich-text helpers (e.g. next-intl `t.rich`).
export const Default: Story = {
  args: {
    children: (tags) => (
      <>
        {tags.h2('Contacts')}
        {tags.p(
          <>
            Call us at {tags.tel('+380441234567')} or write to {tags.email('info@example.com')}.{tags.br(null)}
            {tags.b('Working hours:')} 9:00 - 18:00
          </>,
        )}
        {tags.ul(
          <>
            {tags.li('First item')}
            {tags.li('Second item')}
          </>,
        )}
      </>
    ),
  },
};
