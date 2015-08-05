var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    include = require("gulp-include"),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

var paths = {
    src: {
        root: './src',
        js: './src/js',
        scss: './src/scss',
        bower: './bower_components'
    },
    assets: {
        root: './assets',
        css: './assets/css',
        js: './assets/js'
    }
};

gulp.task('default', function () {
    gulp.start('compile', 'watch');
});

gulp.task('compile', function () {
    gulp.start('js', 'html', 'css', 'sass');
});

gulp.task('watch', function () {
    console.log('Watching...');
    gulp.watch(paths.src.scss + "/**/*.scss", ['sass']);
    gulp.watch(paths.src.js + "/app/app.html", ['html']);
    gulp.watch(paths.src.js + "/**/*.template.html", ['html']);
    gulp.watch(paths.src.js + '/**/*.js', ['js']);
});

gulp.task('sass', function() {
    gulp.src(paths.src.scss + '/theme/default.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.assets.css));
});

gulp.task('html', function() {
    gulp.src(paths.src.js + '/app/app.html')
        .pipe(plumber())
        .pipe(include())
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.assets.root));
});

gulp.task('js', function () {
    gulp.src([
        paths.src.bower + '/underscore/underscore.js',
        paths.src.bower + '/jquery/dist/jquery.js',
        paths.src.bower + '/backbone/backbone.js'
    ])
        .pipe(concat('thirdparty.js'))
        .pipe(gulp.dest(paths.assets.js));

    browserify(paths.src.js + '/app/app.js').bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(paths.assets.js));
});

gulp.task('css', function () {
    gulp.src([
        paths.src.bower + '/skeleton/css/normalize.css',
        paths.src.bower + '/skeleton/css/skeleton.css'
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.assets.css));
});

