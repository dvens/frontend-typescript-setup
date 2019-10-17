const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SassLintPlugin = require('sass-lint-webpack');

// Utilities
const {
    config,
    alias
} = require('../utilities/get-config');

const getDefaultMode = require('../utilities/get-default-mode');

// Loaders
const configureBabelLoader = require('../loaders/javascript-typescript');
const eslintConfig = require('../loaders/eslint');
const configureCSSLoader = require('../loaders/style-sass');

const defaultOptions = {
    mode: getDefaultMode(),
    entry: config.appEntry,
};

const createBaseConfig = (userOptions = {}, legacy = false) => {

    const options = {
        ...defaultOptions,
        ...userOptions
    };


    const firstConfig = legacy;

    const outputFilename = `${legacy ? `${ config.legacyPrefix }` : ''}[name].js`;
    const outputChunkFilename = `${ legacy ? `chunks/${ config.legacyPrefix }` : 'chunks/'}[name].js`;

    const defaultConfig = {
        context: config.root,

        mode: options.mode,

        entry: options.entry,

        devtool: config.sourceMap ? 'cheap-module-source-map' : undefined,

        plugins: [
            new MiniCssExtractPlugin({
                filename: '/assets/css/[name].css',
            }),
            new SassLintPlugin()
        ],

        module: {
            rules: [

                // Javascript/Typescript
                ...configureBabelLoader({
                    includedPackages: options.includedPackages,
                    plugins: options.plugins,
                    presets: options.presets,
                    legacy
                }),
                eslintConfig,

                //CSS/SASS
                ...configureCSSLoader()

            ]
        },

        output: {
            filename: outputFilename,
            chunkFilename: outputChunkFilename,
            path: config.dist,
        },

        resolve: {
            alias,
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },

        optimization: {
            splitChunks: {
                chunks: 'async',
                automaticNameDelimiter: '.'
            }
        }
    };

    if (firstConfig) defaultConfig.plugins.push(new CleanWebpackPlugin());

    return defaultConfig;
};

module.exports = createBaseConfig;
