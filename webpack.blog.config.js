var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require("path");

var _config = {
    name : 'blog',
    title : 'blog'
};

module.exports = {
    entry:{
       /* index :"./public/react/index.jsx",*/
        loginRegister :"./public/react/loginRegister.jsx",
    },
    output:{
        path:"./public/dist/",
        filename:"[name].js"
    },
    module:{
        loaders:[
       /*     {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$'
            },*/
            {
                test:/.css$/,
                loaders:["style","css"],
                exclude:"/node_modules/"
            },
            {
                test:/.jsx?$/,
                loaders:['react-hot','babel?presets[]=es2015&presets[]=react'],
                exclude:"/node_modules/",
                include:path.resolve(__dirname,'public')
            },
            {
                test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?&name=images/[name].[ext]'
            }
        ]
    },
    resolve:{
        extensions:['','.js',".css",'.jsx'],  //自动补全识别后缀
        alias : {
            common : path.resolve(__dirname,'./base/js')
        }
    },
    devServer:{
        proxy: {
            '/api/*': {
                target: 'http://localhost:8081',
                secure: false
            }
        }
    },
    /*     externals: {
     'react': 'window.React',
     'react-dom': 'window.ReactDOM'
     },*/
    plugins:[
        new htmlWebpackPlugin({
            filename : _config.name+'-index.html',
            title:_config.title,
            chunks:["index"],
            template: './base/dist/index.html'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};