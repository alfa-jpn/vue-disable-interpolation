'use strict';

import gulp          from 'gulp';
import webpack       from 'webpack'
import webpackConfig from './webpack.config'
import webpackStream from 'webpack-stream'

gulp.task('default', ['build:dev']);
gulp.task('release', ['build:prod', 'build:prod:min']);

gulp.task('build:dev', () => {
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('test/dist'));
});

gulp.task('build:prod', () => {
    let config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            mangle:   false,
        }),
    ]);

    return webpackStream(config, webpack)
        .pipe(gulp.dest("dist"));
});

gulp.task('build:prod:min', () => {
    let config             = Object.create(webpackConfig);
    config.output.filename = config.output.filename.replace(/.js$/, '.min.js');
    config.plugins         = config.plugins.concat([new webpack.optimize.UglifyJsPlugin()]);

    return webpackStream(config, webpack)
        .pipe(gulp.dest("dist"));
});
