const path = require('path');

module.exports = {
  entry: './src/index.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /test/],
        use: [{ loader: 'ts-loader' }],
      },

      {
        test: /\.pcss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-simple-vars'),
                  require('postcss-nested-ancestors'),
                  require('postcss-nested'),
                ],
              },
            },
          },
        ],
      },

      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
    library: 'LinkTune',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};
