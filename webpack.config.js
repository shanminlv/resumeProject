'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
        entry: {
        	app: [
                'webpack-dev-server/client?http://localhost:8080/',
                './src/js/entry.js'
            ]
        },
        output: {
            path: './dist/resource/',
            filename: 'index.js',
            publicPath: 'resource/'
        },
        resolve:{
            extensions:['','.js','.json','.scss','.html'],
            alias:{
            }
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.jsx?$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: 'babel',
                  query: {
                        presets: ['es2015','react']
                    } 
                },
                { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
                { test: /\.json$/, loader: 'json-loader'},
                {test: /\.scss$/,loader: 'style!css!sass'},
                {test: /\.html$/,loader: 'html-withimg-loader'} 
            ]
        },
        plugins:[
            new CopyWebpackPlugin([
                    {from:'./src/index.html',to:"../index.html"}
                ])
        ]
    }
