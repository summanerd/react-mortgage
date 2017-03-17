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
            }, {
                test: /\.scss$/,
                loader: 'style-loader'
            }, {
                test: /\.scss$/,
                loader: 'css-loader'
            }, {
                test: /\.scss$/,
                loader: 'sass-loader',
                options: {
                    includePaths: [FOUNDATION_DIR + '/scss']
                }
            }
        ]
        // postLoaders: [
        //     { //delays coverage til after tests are run, fixing transpiled source coverage error
        //         test: /\.js?/,
        //         include: path.resolve(__dirname, 'src/'),
        //         loader: 'istanbul-instrumenter-loader'
        //     }
        // ]
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    }
};

module.exports = config;