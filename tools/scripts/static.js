// Utilities
const run = require('./run');
const getDefaultMode = require('../utilities/get-default-mode');
const isProduction = getDefaultMode() === 'production';

// Scripts
const bundle = require('./bundle');
const clean = require('./clean');
const generateStaticRoutes = require('../utilities/generate-static-routes');
const generatePolyfills = require('../utilities/generate-polyfills');
const generateServiceWorker = require('../utilities/generate-sw');

async function staticBuild() {
    await run(clean);
    if (isProduction) {
        await run(generatePolyfills);
    }
    await run(bundle);
    await run(generateStaticRoutes);
    if (isProduction) {
        await run(generateServiceWorker);
    }
}

module.exports = staticBuild;
