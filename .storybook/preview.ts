import { applicationConfig, type Preview } from '@storybook/angular/dist/client';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import docJson from '../documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideNoopAnimations()]
    })
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
