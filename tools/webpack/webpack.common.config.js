const SassLintPlugin = require('sass-lint-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const env = require('../utilities/env')();

// Utilities
const { config, alias } = require('../utilities/get-config');

const getDefaultMode = require('../utilities/get-default-mode');
const isVerbose = process.argv.includes('--verbose');

// Loaders
const configureBabelLoader = require('../loaders/javascript-typescript');
const { configureStyleLoader } = require('../loaders/style-loader');
const imageLoader = require('../loaders/image-loader');
const fontsLoader = require('../loaders/fonts-loader');

const mode = getDefaultMode();
const isProduction = mode === 'production';

const createBaseConfig = (legacy = false) => {
    const contenthash = isProduction ? '.[contenthash]' : '';
    const outputFilename = `${config.jsOutputPath}${
        legacy ? `${config.legacyPrefix}` : ''
    }[name]${contenthash}.js`;
    const outputChunkFilename = `${config.jsOutputPath}${
        legacy ? `chunks/${config.legacyPrefix}` : 'chunks/'
    }[name]${contenthash}.js`;

    const defaultConfig = {
        target: 'web',

        context: config.root,

        mode: mode,

        entry: config.clientEntry,

        devtool: !isProduction ? 'cheap-module-source-map' : undefined,

        plugins: [
            new SassLintPlugin(),
            new CopyPlugin(config.copy || {}),
            new ESLintPlugin({
                emitWarning: true,
                failOnError: true,
            }),
            new webpack.DefinePlugin(env.stringified),
            new webpack.DefinePlugin({
                __SERVER__: 'false',
                __BROWSER__: 'true',
            }),
        ],

        module: {
            rules: [
                // Javascript/Typescript
                ...configureBabelLoader({
                    includedPackages: options.includedPackages,
                    plugins: options.babelLoaderPlugins,
                    presets: options.babelLoaderPresets,
                    legacy,
                }),

                //CSS/SASS
                ...configureStyleLoader(),

                //Assets
                imageLoader(),
                fontsLoader(),
            ],
        },

        output: {
            filename: normalizePath(outputFilename),
            chunkFilename: normalizePath(outputChunkFilename),
            path: config.clientDist,
            publicPath: config.publicPath,
        },

        resolve: {
            alias,
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', 'json'],
        },

        optimization: {
            splitChunks: {
                chunks: 'async',
                automaticNameDelimiter: '.',
            },
        },

        // Don't attempt to continue if there are any errors.
        bail: isProduction,

        cache: !isProduction,

        // Specify what bundle information gets displayed
        // https://webpack.js.org/configuration/stats/
        stats: {
            cached: isVerbose,
            cachedAssets: isVerbose,
            chunks: isVerbose,
            chunkModules: isVerbose,
            colors: true,
            hash: isVerbose,
            modules: isVerbose,
            reasons: !isProduction,
            timings: true,
            version: isVerbose,
        },
    };

    return defaultConfig;
};

module.exports = createBaseConfig;
