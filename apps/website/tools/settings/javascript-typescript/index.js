const findSupportedBrowsers = require('../../utilities/get-browser-list');

module.exports = configureBabelLoader = ({
    transpilePackages = [],
    plugins = [],
    presets = [],
    legacy = false
}) => {

    const options = {
        plugins: [
            '@babel/syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            ...plugins,
        ],
        presets: [
            ['@babel/preset-env', {
                targets: legacy ? ['ie 11'] : findSupportedBrowsers(),
                useBuiltIns: false,
                modules: false,
            }],
            ...presets,
        ],
    };

    return [{
        test: [/\.(ts|js)x?$/, new RegExp(`node_modules(\\/|\\\\)(${transpilePackages.join('|')})(.*)\\.js$`)],
        exclude: /node_modules/,
        use: [{
            loader: require.resolve('babel-loader'),
            options
        }, {
            loader: require.resolve('ts-loader'),
        }],
    }];

};
