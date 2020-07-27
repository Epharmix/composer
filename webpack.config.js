const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './views/index.tsx'
  },
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'static', 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/static/dist/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'CareSignal',
      staticURL: '/static/',
      template: './views/index.html',
      scriptLoading: 'defer'
    }),
    /**
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    */
    new LiveReloadPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'views/tsconfig.json'
          },
        },
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'fonts'
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'images'
        }
      }
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
  },
  resolve: {
    // Webpack speed optimization since we don't use npm / yarn link
    symlinks: false,
    modules: [ 'node_modules' ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },
  resolve: {
    alias: {
      "@grid": path.resolve(__dirname,'views/grid/'),
      "@libs": path.resolve(__dirname, 'views/libs/'),
      "@contexts": path.resolve(__dirname, 'views/contexts/'),
      "@atoms": path.resolve(__dirname, 'views/components/atoms/'),
      "@molecules": path.resolve(__dirname, 'views/components/molecules/'),
      "@organisms": path.resolve(__dirname, 'views/components/organisms/'),
      "@pages": path.resolve(__dirname, 'views/components/pages/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },
  optimization: {
    // Prevents unnecessary hash changes
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },
};
