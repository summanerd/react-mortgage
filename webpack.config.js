var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client');


var config = {
    entry: APP_DIR + '/app.js',
    output: {
         path: BUILD_DIR + '/js',
         filename: 'main.js'
    },
    module: {
        loaders: [{
             test: /\.jsx?/,
             include: APP_DIR,
             loader: 'babel-loader'
        }]
    }
};

module.exports = config;