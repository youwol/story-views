const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    context: ROOT,
    entry: {
        'main': './index.ts'
    },
    output: {
        path: DESTINATION,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: pkg.name,
        filename: pkg.name + ".js",
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },
    plugins: [
        //new BundleAnalyzerPlugin()
    ],
    externals: [{
        'rxjs': "rxjs",
        'rxjs/operators': {
            commonjs: 'rxjs/operators',
            commonjs2: 'rxjs/operators',
            root: ['rxjs', 'operators']
        },
        '@youwol/flux-lib-core': "@youwol/flux-lib-core",
        '@youwol/flux-view': "@youwol/flux-view",
        "@youwol/cdn-client": '@youwol/cdn-client',
        "@youwol/flux-core": '@youwol/flux-core',
        "@youwol/flux-view": '@youwol/flux-view',
        "@youwol/flux-files": '@youwol/flux-files',
        "@youwol/fv-group": '@youwol/fv-group',
        "@youwol/fv-input": '@youwol/fv-input',
        "@youwol/fv-tree": '@youwol/fv-tree',
        "@youwol/fv-tabs": '@youwol/fv-tabs',
        "@youwol/fv-button": '@youwol/fv-button',
        "@youwol/fv-context-menu": '@youwol/fv-context-menu',
        "@youwol/flux-youwol-essentials": '@youwol/flux-youwol-essentials',
        "@youwol/flux-fv-widgets": '@youwol/flux-fv-widgets',
    }],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'ts-loader' },
                ],
                exclude: /node_modules/,
            }
        ],
    },
    devtool: 'source-map'
};
