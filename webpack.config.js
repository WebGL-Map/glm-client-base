const path = require('path');

const entryFile = './src/main.js';

module.exports = {
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
            }
        ]
    },
    externals: {
        //"math.gl": 'math.gl',
    },
}
;