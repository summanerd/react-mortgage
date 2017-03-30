const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: false//process.env.NODE_ENV === "development"
});
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src/client');
const FOUNDATION_DIR = path.resolve(__dirname, 'node_modules/foundation-sites');


const config = {
    devServer: { inline: true },
    entry: [
        // 'webpack-dev-server/client?http://localhost:8080/',
        APP_DIR + '/app.js',
        path.resolve(__dirname, 'src/styles/main.scss')
    ],
    output: {
        path: BUILD_DIR + '/js',
        filename: 'main.js',
        publicPath: '/assets'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: [FOUNDATION_DIR + '/scss']
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader",
                    publicPath: '/css'
                })
            }
        ]
    },
    plugins: [
        extractSass
    ],
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};

module.exports = config;