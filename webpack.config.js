const path = require('path');

const entryFile = './src/main.js';

module.exports = [
    {
        entry    : {
            glm: entryFile,
        },
        output   : {
            path         : __dirname + '/dist',
            filename     : '[name].umd.js',
            libraryTarget: 'umd',
        },
        module   : {
            rules: [
                {
                    test   : path.join(__dirname, 'src'),
                    loader : 'babel-loader',
                    options: {
                        presets: ["env", "stage-1"],
                    }
                },
                {
                    test   : path.join(__dirname, 'src/config.js'),
                    loader : 'file-loader',
                    options: {
                        name: 'glm-config.js',
                    },
                }
            ]
        },
        externals: {
            "GLM_CONFIG": 'window'
        }
    }
];