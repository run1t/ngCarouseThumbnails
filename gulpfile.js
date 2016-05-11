(function() {

    var mainModule = 'dist/ng-carousel-thumbnails.js',
        vendorDest = 'example/js/vendor/ng-carousel-thumbnails/dist',
        devDist    = 'ng-carousel-thumbnails.js',
        minDist    = 'ng-carousel-thumbnails.min.js';

    var gulp   = require('gulp'),
        child_process = require('child_process'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        livereload = require('gulp-livereload'),
        sass = require('gulp-sass'),
        coffee = require('gulp-coffee'),
        pug = require('gulp-pug');
    
    
    gulp.task('pug', function () {
      return gulp.src('src/**/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest(vendorDest))
        .pipe(livereload());
    });
      
    gulp.task('coffee', function() {
      gulp.src('src/**/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(rename(devDist))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest(vendorDest))
        .pipe(livereload());
    });
    
    gulp.task('sass', function () {
      gulp.src('src/**/ng*.scss')
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(rename('css/default.css'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest(vendorDest))
        .pipe(livereload());
    });
    
    gulp.task('uglify', function gulpBuild(){
      gulp.src(mainModule)
          .pipe(rename(minDist))
          .pipe(uglify())
          .pipe(gulp.dest('dist'))
          .pipe(gulp.dest(vendorDest))
          .pipe(livereload());
    });

    gulp.task('watch', function() {
      livereload.listen();
      gulp.watch(['src/*/**.scss'], ['sass']);
      gulp.watch(['src/*/**.pug'], ['pug',]);
      gulp.watch(['src/**.coffee'], ['coffee']);
    });
    
    gulp.task('server', function(cb) {
      child_process.exec('node example/server/default.js', function(error, stdout, stderr){
	      console.log(stdout);
        cb(error);
      });
    });
    
    gulp.task('build',['sass','pug','coffee','uglify']);
    gulp.task('default',['build','watch','server']);

})();