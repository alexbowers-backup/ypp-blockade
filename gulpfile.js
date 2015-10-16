var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css');

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    });
});

gulp.task('browserify', function () {
    return browserify('./src/assets/scripts/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('styles', function () {
    return sass('src/assets/sass/main.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/styles'));
});

gulp.task('watch', function() {
    gulp.watch('src/assets/scripts/**/*.js', ['browserify']);
    gulp.watch('src/assets/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['browserify', 'styles','connect', 'watch']);