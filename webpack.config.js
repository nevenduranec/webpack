var webpack = require('webpack');
var rootDir = __dirname;
var nodeDir = rootDir + '/node_modules/';

module.exports = {
    context: rootDir, // a base directory to resolve the “entry”

    entry: {
        main: 'main.js'
    },

    output: {
        path: './js/built/',
        publicPath: './js/built/',
        filename: "[name].js" // [name] means we are going to use the "key" value of each entry as the bundle file name
    },

    resolve: {
        extensions: ['', '.js', '.jsx'], // resolve file extentions so that we don't have to specify the extention for js and jsx files,
        modulesDirectories: ['js', 'node_modules']
    },


    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            ScrollMagic: 'scrollmagic'
        })
    ]
};
