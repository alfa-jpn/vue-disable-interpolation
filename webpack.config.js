const config = {
    entry:  './src/index.js',
    output: {
        library:       'VueDisableInterpolation',
        libraryTarget: 'var',
        filename:      'vue-disable-interpolation.js'
    },
    module: {
        loaders: [{
            test:    /\.js$/,
            exclude: /node_modules/,
            loader:  'babel-loader'
        }]
    },
    plugins: []
};
export default config;
