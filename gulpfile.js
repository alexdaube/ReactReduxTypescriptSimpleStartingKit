var config = require('./webpack.config.js');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var open = require('gulp-open');

function swallowError(error) {
    console.log(error.toString());
    this.emit('end')
}

gulp.task('ts', function () {
    return gulp.src('src/index.tsx')
        .pipe(webpack(config))
        .on('error', swallowError)
        .pipe(gulp.dest('.'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src('./scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());

});

gulp.task('watch', function () {
    gulp.watch(['./**/*.ts', './**/*.tsx'], ['ts']);
    gulp.watch(['./**/*.scss'], ['sass']);
});

gulp.task('connect', function () {
    connect.server({
        root: '',
        port: '8000',
        livereload: true,
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('./index.html').pipe(open({uri: 'http://localhost:8000', app: 'Google Chrome'}));
});

gulp.task('default', ['ts', 'sass', 'open', 'watch'], function () {
});
