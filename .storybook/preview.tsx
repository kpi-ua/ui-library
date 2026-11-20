import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/index.css';
import '../src/styles/fonts.css';
import { TooltipProvider } from '../src/ui/primitives/tooltip';

const withTheme: Decorator = (Story, context) => {
  document.documentElement.classList.toggle('dark', context.globals.theme === 'dark');
  return (
    <TooltipProvider>
      <Story />
    </TooltipProvider>
  );
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
    options: { storySort: { order: ['Introduction', 'Foundations', '*'] } },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  tags: ['autodocs'],
};

export default preview;
