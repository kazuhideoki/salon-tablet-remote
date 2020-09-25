const path = require("path");

const fontsFileName = `fonts/[name].[ext]`;


module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: async (config, { configType }) => {
    // cssをstorybookで読み込めるようにする
    config.module.rules.push({
      test: [/\.scss$/, /\.css$/],
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    // use svgr for svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    })
    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loaders: ["file-loader"],
      include: path.resolve(__dirname, "../"),
    });
    
    // config.module.rules.push({
    //   test: /\.ttf$/,
    //   use: [
    //     {
    //       loader: "ttf-loader",
    //       options: {
    //         name: "./fonts/[hash].[ext]",
    //       },
    //     },
    //   ],
    // });
    // config.module.rules.push({
    //     test: /\.ttf(\?.*)?$/,
    //     loader: `url?prefix=fonts/&name=${fontsFileName}&limit=10000&mimetype=application/octet-stream`
    // });

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
