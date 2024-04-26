const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  "core": {
    "builder": {
      "name": "@storybook/builder-vite",
      "options": {
        viteConfigPath: undefined
      }
    }
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');
    const { default: angular } = await import('@analogjs/vite-plugin-angular');

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      plugins: [
        angular.default({ jit: true, tsconfig: './.storybook/tsconfig.json' }),
        {
          name: '@storybook/angular',
          transform(code) {
            if (code.includes('"@storybook/angular"')) {
              return code.replace(/\"@storybook\/angular\"/g, '\"@storybook/angular/dist/client\"');
            }

            return;
          }
        }
      ]
    });
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
