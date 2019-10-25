const resolveApp = require('../tools/utilities/resolve-app');

const config = {};

// Root folder
config.root = resolveApp('');

// Source folder
config.source = resolveApp('src');
config.pages = resolveApp('pages');
config.components = resolveApp('components');
config.dotenv = resolveApp('.env');

// Entries
config.appEntry = 'index.ts';
config.polyfillEntry = 'polyfill.ts';
config.serverEntry = 'server.ts';

// Server folder
config.server = resolveApp('server');

// Static folder
config.static = resolveApp('static');

// Assets Folder
config.assets = resolveApp('static/assets');

// Styles Folder
config.styles = resolveApp('static/styles');

// Dist Folder
config.dist = resolveApp('build');
config.clientDist = config.dist;

// Assets dist folders
config.imagesOutputPath = '/assets/images/';
config.fontsOutputPath = '/assets/fonts/';
config.jsOutputPath = 'assets/js/'
config.publicPath = '';


// Config legacy prefix
config.legacyPrefix = 'legacy_';

// Config CSS in JS option
config.cssInJS = true;

// Copy config
config.copy = [{
    from: `${config.static}/data`,
    to: `assets/data`
}]

module.exports = config;