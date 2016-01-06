var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var rootDir = __dirname;
var srcDir = rootDir + "/src";
var distDir = rootDir + "/dist";

module.exports = {
    context: rootDir, // a base directory to resolve the “entry”

    entry: 'main.js',

    output: {
        path: distDir,
        publicPath: '/js/',
        filename: "main-built.js" // [name] means we are going to use the "key" value of each entry as the bundle file name
    },

    resolve: {
        extensions: ['', '.js', '.jsx'], // resolve file extentions so that we don't have to specify the extention for js and jsx files,
        modulesDirectories: ['js', 'node_modules']
    },


    plugins: [
        commonsPlugin
    ]
};
