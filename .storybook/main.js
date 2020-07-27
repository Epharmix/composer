const path = require('path');

module.exports = {
  stories: ['../views/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    {
      name: '@storybook/preset-typescript',
      options: {
        include: [/\.tsx?$/]
      }
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        include: [/\.tsx?$/]
      }
    }
  ],
  webpackFinal: async config => {
    // do mutation to the config
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    // load webfonts
    config.module.rules.push({
      test: /\.(woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        outputPath: 'fonts'
      }
    });
    // resolve aliases
    config.resolve = {
      alias: {
        "@libs": path.resolve(__dirname, '../views/libs/'),
        "@grid": path.resolve(__dirname, '../views/grid/'),
        "@contexts": path.resolve(__dirname, '../views/contexts/'),
        "@atoms": path.resolve(__dirname, '../views/components/atoms/'),
        "@molecules": path.resolve(__dirname, '../views/components/molecules/'),
        "@organisms": path.resolve(__dirname, '../views/components/organisms/'),
        "@pages": path.resolve(__dirname, '../views/components/pages/'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    };
    // Return the altered config
    return config;
  },
};
