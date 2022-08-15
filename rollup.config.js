import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import path from 'path';

const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const resolve = (p) => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`));
const packageOptions = pkg.buildOptions || {};
const name = packageOptions.filename || path.basename(packageDir);

const outputConfigs = {
    cjs: {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs',
    },
    'esm-bundle': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es',
    },
};

const packageFormats = Object.keys(outputConfigs);

const packageConfigs = packageFormats.map((format) =>
    createConfig(format, outputConfigs[format])
);

packageFormats.forEach((format) => {
    if (format === 'cjs') {
        packageConfigs.push(createProductionConfig(format));
    }
});

export default packageConfigs;

function createConfig(format, output, plugins = []) {
    const isProductionBuild = /\.prod\.js$/.test(output.file);
    const shouldEmitDeclarations = false;

    output.sourcemap = !!process.env.SOURCE_MAP;
    output.externalLiveBindings = false;

    const tsPlugin = ts({
        tsconfig: resolve('tsconfig.json'),
        check: process.env.NODE_ENV === 'production',
        tsconfigOverride: {
            compilerOptions: {
                sourceMap: output.sourcemap,
                declaration: shouldEmitDeclarations,
                declarationMap: shouldEmitDeclarations,
            },
            exclude: ['**/__tests__', 'test-dts'],
        },
    });

    let entryFile = `src/index.ts`;

    return {
        input: resolve(entryFile),
        plugins: [
            tsPlugin, 
            createReplacePlugin(isProductionBuild), 
            ...plugins
        ],
        output,
    };
}

function createReplacePlugin(isProduction) {
    const replacements = {
        __DEV__: !isProduction,
    };

    Object.keys(replacements).forEach((key) => {
        if (key in process.env) {
            replacements[key] = process.env[key];
        }
    });

    return replace({
        // @ts-ignore
        values: replacements,
        preventAssignment: true,
    });
}

function createProductionConfig(format) {
    return createConfig(format, {
        file: resolve(`dist/${name}.${format}.prod.js`),
        format: outputConfigs[format].format,
    });
}

function createMinifiedConfig(format) {
    const { terser } = require('rollup-plugin-terser');

    return createConfig(
        format,
        {
            file: outputConfigs[format].file.replace(/\.js$/, '.prod.js'),
            format: outputConfigs[format].format,
        },
        [
            terser({
                module: /^esm/.test(format),
                compress: {
                    ecma: 2015,
                    pure_getters: true,
                },
                safari10: true,
            }),
        ]
    );
}
