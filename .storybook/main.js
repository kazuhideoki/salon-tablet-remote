const path = require("path");


module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: async (config, { configType }) => {
    // cssをstorybookで読み込めるようにする
    config.module.rules.push({
      test: [/\.scss$/, /\.css$/],
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
  addons: [
    "@storybook/preset-typescript",
    "@storybook/preset-scss",

    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
    "@storybook/addon-viewport",
  ],
};
