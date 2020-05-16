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

    config.node = {
      fs: 'empty'
    }

    const internalNodeModulesRegExp = [ /@zeit(?!.*node_modules)/, /fs/ ]

    config.externals = config.externals.map((module) => {
      if (typeof module !== 'function') {
        return module
      }

      return (ctx, req, cb) => (internalNodeModulesRegExp.some((item) => item.test(req)) ? cb() : module(ctx, req, cb))
    })

    return config
  },
  target: 'server'
}