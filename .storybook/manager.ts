import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Igor Sikorsky Kyiv Polytechnic Institute UI Kit',
    brandUrl: 'https://github.com/kpi-ua/ui-library',
    brandTarget: '_blank',
  }),
});
