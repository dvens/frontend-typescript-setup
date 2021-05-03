import getAssetFilehash from '../tools/utilities/get-asset-filehash';
import config from './config';

const POLYFILL_OUTPUT_PATH = `/assets/js/polyfills/`;

const polyfillConfig = {
    templateOutputPath: `${config.components}/templates/scripts.tsx`,
    polyfillOutputPath: `${config.clientDist}${POLYFILL_OUTPUT_PATH}`,
    paths: {
        entries: `${config.assetPrefix}${config.jsOutputPath}`,
        polyfills: `${config.assetPrefix}${POLYFILL_OUTPUT_PATH}`,
    },
    modern: {
        files: [{ path: getAssetFilehash(`${config.clientDist}/asset-manifest.json`, 'main.js') }],
    },
    legacy: {
        test: "'noModule' in HTMLScriptElement.prototype",
        files: [
            {
                path: getAssetFilehash(
                    `${config.clientDist}/${config.legacyPrefix}asset-manifest.json`,
                    'main.js',
                    config.legacyPrefix,
                ),
            },
        ],
    },
    polyfills: {
        coreJs: true,
        regeneratorRuntime: true,
        webcomponents: true,
        fetch: true,
        intersectionObserver: true,
        minify: true,
        hash: true,
    },
};

export default polyfillConfig;