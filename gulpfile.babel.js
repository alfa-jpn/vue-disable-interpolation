'use strict';

import gulp          from 'gulp';
import ejs           from 'gulp-ejs'
import mocha         from 'gulp-mocha'
import rename        from 'gulp-rename'
import webserver     from 'gulp-webserver'
import webpack       from 'webpack'
import webpackConfig from './webpack.config'
import webpackStream from 'webpack-stream'

gulp.task('test',    ['build:test', 'build:test:ejs', 'test:e2e']);
gulp.task('release', ['build:prod', 'build:prod:min']);

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
    let config     = Object.create(webpackConfig);
    config.plugins = config.plugins.concat([new webpack.optimize.UglifyJsPlugin()]);

    return webpackStream(config, webpack)
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest("dist"));
});

gulp.task('build:test', () => {
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('test/dist'));
});

gulp.task('build:test:ejs', () => {
   return gulp.src('test/templates/*.ejs')
       .pipe(ejs({ vue_version: (process.env.VUE_VERSION || '2.0.0') }))
       .pipe(rename({ extname: '.html' }))
       .pipe(gulp.dest('test/dist'));
});

gulp.task('test:e2e', () => {
    let server = gulp.src('test/dist')
        .pipe(webserver({ host: 'localhost', port: 3003, livereload: false }));

    return gulp.src('test/e2e/**/*_spec.js', { read: false })
        .pipe(mocha({ reporter: 'list', compilers: 'js:babel-core/register', timeout: 8000 }))
        .on('end', () => { server.emit('kill') });
});
