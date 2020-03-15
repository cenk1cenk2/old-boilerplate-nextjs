const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [ new TsconfigPathsPlugin() ]
    }

    const { dev, isServer } = options
    const { cssModules,
      cssLoaderOptions,
      postcssLoaderOptions,
      sassLoaderOptions = {} } = config

    options.defaultLoaders.sass = cssLoaderConfig(config, {
      extensions: [ 'scss', 'sass' ],
      cssModules,
      cssLoaderOptions,
      postcssLoaderOptions,
      dev,
      isServer,
      loaders: [
        {
          loader: 'sass-loader',
          options: sassLoaderOptions
        }
      ]
    })

    config.module.rules.push(
      {
        test: /\.scss$/,
        use: options.defaultLoaders.sass
      },
      {
        test: /\.sass$/,
        use: options.defaultLoaders.sass
      }
    )

    return config
  },
  target: 'serverless'
}