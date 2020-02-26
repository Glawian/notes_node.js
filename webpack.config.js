var HTMLWebpackplugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var plugin1 = new HTMLWebpackplugin({
    template: './src/index.html'
});

var plugin2 = new CopyWebpackPlugin([{
    from: './src/style.css'
}]);

var mojePluginy = [plugin1, plugin2];

var mode = 'development';
var isProduction = process.env['PRODUCTION'];

if (isProduction) {
    mode = 'production';
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: mojePluginy,
    mode: mode
};