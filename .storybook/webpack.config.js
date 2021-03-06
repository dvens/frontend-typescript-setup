const configureBabelLoader = require('../tools/loaders/javascript-typescript');
const configureNunjucksLoader = require('../tools/loaders/nunjucks');
const configureCSSLoader = require('../tools/loaders/style-sass');
const SassLintPlugin = require('sass-lint-webpack');

const { alias } = require('../tools/utilities/get-config');

module.exports = ({ config }) => {
    // Javascript/Typescript loader
    config.module.rules.push(
        ...configureBabelLoader({
            includedPackages: [/node_modules\/(?!@atomify)/],
            legacy: true,
        }),
    );

    // Nunjucks loader
    config.module.rules.push(...configureNunjucksLoader());

    // CSS/SASS loader
    config.module.rules.push(...configureCSSLoader({ extract: false }));
    config.plugins.push(new SassLintPlugin());

    // Valid extensions
    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx', '.md');

    // Alias configuration
    config.resolve.alias = alias;

    return config;
};
