const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map'
};