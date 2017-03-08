var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client');
var FOUNDATION_DIR = path.resolve(__dirname, 'node_modules/foundation-sites');


var config = {
    entry: APP_DIR + '/app.js',
    output: {
         path: BUILD_DIR + '/js',
         filename: 'main.js'
    },
    module: {
        loaders: [
            {
                 test: /\.jsx?/,
                 include: APP_DIR,
                 loader: 'babel-loader'
            },{
                test: /\.scss$/,
                loader: 'style-loader'
            },{
                test: /\.scss$/,
                loader: 'css-loader'
            },{
                test: /\.scss$/,
                loader: 'sass-loader',
                options: {
                    includePaths: [FOUNDATION_DIR + '/scss']
                }
            }
        ]
    }
};

module.exports = config;