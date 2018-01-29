var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'realServer.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options:{
                    "presets": [
                        ["env", {
                            "targets": {
                                "node": "current"
                            }
                        }]
                    ],
                    "plugins": [
                        ["transform-object-rest-spread", { "useBuiltIns": true }]
                    ]
                }
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules"
        ]
    },
    stats: {
        colors: true
    },
    target: "node",
    externals: [nodeExternals({
        // take advantage of ES6 friendly modules for tree shaking
        whitelist: ['graphql-spotify']
    })],
    devtool: 'source-map'
};