const path = require('path');
const { config } = require('../../utilities/get-config');

const getDefaultMode = require('../../utilities/get-default-mode');
const isDevelopment = getDefaultMode() === 'development';

const imageLoader = (userOptions = {}) => {
    const defaultOptions = {
        name() {
            if (isDevelopment) {
                return '[path][name].[ext]';
            }

            return '[name].[ext]';
        },
        outputPath(url, resourcePath) {
            const relativePath = path.relative(config.public, resourcePath);
            return `/${relativePath}`;
        },
    };

    const imageWebpackLoaderOptions = {
        disable: isDevelopment,
        mozjpeg: {
            progressive: true,
            quality: 65,
        },
        optipng: {
            enabled: false,
        },
        pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
        },
        gifsicle: {
            interlaced: false,
        },
    };

    return {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            {
                loader: 'file-loader',
                options: Object.assign({}, defaultOptions, userOptions),
            },
            {
                loader: 'image-webpack-loader',
                options: imageWebpackLoaderOptions,
            },
        ],
    };
};

module.exports = imageLoader;
