(function() {

    var mainModule = 'components/ngCarouselThumbnails.js',
        vendorDest = 'example/js/vendor/ng-carousel-thumbnails',
        devDist    = 'ng-carousel-thumbnails.js',
        minDist    = 'ng-carousel-thumbnails.min.js';

    var gulp   = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        livereload = require('gulp-livereload');

    gulp.task('build', function gulpBuild(){
        gulp.src(mainModule)
            .pipe(rename(devDist))
            .pipe(gulp.dest('dist'))
            .pipe(gulp.dest(vendorDest))
            .pipe(rename(minDist))
            .pipe(gulp.dest('dist'))
            .pipe(livereload());
    });

    gulp.task('watch', function() {
      livereload.listen();
      gulp.watch(['components/*','example/*/*'], ['build']);
    });

    gulp.task('default',['build','watch']);

})();