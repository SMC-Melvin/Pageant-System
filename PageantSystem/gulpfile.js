var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var wiredep = require('wiredep').stream;
var gulpBowerFiles = require('gulp-bower-files');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');



gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
});

gulp.task('clean-js',function(){
    return gulp.src('./public/assets/js/*.min.js')
    .pipe(clean());
});

gulp.task('clean-css',function(){
    return gulp.src('./public/assets/css/*.min.css')
    .pipe(clean());
});

gulp.task('styles',['clean-css'],function(){
        return gulp.src('./assets/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('js',['clean-js'],function(){
    return gulp.src(
        [
            './assets/js/*.js'
        ]
    )
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('html',function(){
    return gulp.src(['index.html'])
    .pipe(wiredep({
        fileTypes: {
            html: {
                replace: {
                    js: '<script src="{{filePath}}"></script>'
                }
            }
        }
    }))
    .pipe(inject(gulp.src([
        './public/assets/css/*.css',
        './public/assets/js/*.js',
        './public/assets/app/**/*.js'
    ], {read: false}),{ignorePath:'public'}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function(){
    gulp.watch(['index.html'],['html']).on('change', browserSync.reload);
    gulp.watch('./assets/app/template/**/*',['angular-template']).on('change', browserSync.reload);
    gulp.watch('./assets/js/*.js',['js']).on('change', browserSync.reload);
    gulp.watch('./assets/scss/*.scss',['styles']).on('change', browserSync.reload);
    gulp.watch('./assets/app/**/*.js',['angular-js']).on('change', browserSync.reload);
});

gulp.task("bower-files", function(){
   gulpBowerFiles().pipe(gulp.dest("./public/vendor"));
});

gulp.task('image',function(){
    return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('font',function(){
    return gulp.src('assets/fonts/*')
    .pipe(gulp.dest('./public/assets/fonts'));
});


gulp.task('angular-js',['clean-angular-js'],function(){
    return gulp.src(
        [
            './assets/app/**/*.js'
        ]
    )
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets/app/'));
});

gulp.task('angular-template',function(){
    return gulp.src('assets/app/template/**/*')
    .pipe(gulp.dest('./public/assets/app/template/'));
});

gulp.task('clean-angular-js',function(){
    return gulp.src('./public/assets/app/*.min.js',{read: false})
    .pipe(clean());
});


gulp.task('default',['browser-sync','bower-files','styles','js','image','font','angular-js','angular-template','html','watch']);