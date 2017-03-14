var path = require('path');
var launchers = require('./test/config/launchers');
var webpackConfig = require('./webpack.config');
// webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

var browsers = Object.keys(launchers);
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var TEST_DIR = path.resolve(__dirname, 'test');

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            './src/**/*.js',
            './test/src/**/*.spec.js'
            // './test/test.bundle.js'
        ],

        // list of files to exclude
        exclude: [],

        preprocessors: {
            // './test/test.bundle.js': ['webpack', 'sourcemap'],
            './test/src/**/*.spec.js': ['webpack','babel'],
            './src/**/*.js': ['webpack','babel','coverage']
        },

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress'
        // CLI --reporters progress
        reporters: ['progress', 'coverage'],// 'junit'],

        // junitReporter: {
        //     // will be resolved to basePath (in the same way as files/exclude patterns)
        //     outputFile: 'test-results.xml',
        //     dir : TEST_DIR + 'coverage/'
        // },
        //
        coverageReporter: {
            type : 'html',
            dir : TEST_DIR + '/coverage/'
        },

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
        browsers: ['Chrome'],

        // customLaunchers: launchers,

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 50000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: false,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            // 'karma-junit-reporter',
            'karma-babel-preprocessor'
        ],

        concurrency: 3,

        forceJSONP: true,

        jsVersion: 0,

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        }
    })
};