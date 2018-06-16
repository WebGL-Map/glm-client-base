const path = require('path');

const entryFile  = './src/main.js';
const configFile = './src/config.js';

module.exports = {
    entry : {
        glm   : entryFile,
        config: configFile
    },
    output: {
        path         : __dirname + '/dist',
        filename     : '[name].umd.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test   : path.join(__dirname, 'src'),
                loader : 'babel-loader',
                options: {
                    presets: ["env", "stage-1"],
                }
            }
        ]
    },
};