import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/index.css';
import '../src/styles/fonts.css';

const withTheme: Decorator = (Story, context) => {
  document.documentElement.classList.toggle('dark', context.globals.theme === 'dark');
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  tags: ['autodocs'],
};

export default preview;
