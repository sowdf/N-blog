const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom'
    // ...其它库
];

module.exports = {
    output: {
        path: './base/dist/',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};