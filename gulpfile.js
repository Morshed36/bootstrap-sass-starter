var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');  
var uglify = require('gulp-uglify'); 


var config = {
    bootstrapDir: 'src/bower_components/bootstrap-sass',
    cssDir: 'app/assets/css',
    fontDir: 'app/assets/fonts'
};

gulp.task('css', function() {
    return gulp.src('src/scss/app.scss')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets/'],
        outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(config.cssDir));
});

gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.fontDir));
});

/*concanet n minify js files*/
var jsFiles = [
    'src/bower_components/jquery/dist/jquery.js',
    'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    'src/js/*.js'
];

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/assets/js'));
});

gulp.task('default', function() {
  gulp.start('css', 'fonts', 'scripts');
});


gulp.task('watch', ['css', 'fonts', 'scripts'], function () {
	// body...
	gulp.watch(['scss/**/*.scss'], ['css']);
	gulp.watch(['scss/**/*.scss'], ['scripts']);
});

gulp.task('sass', ['css'], function () {
    // body...
    gulp.watch(['scss/**/*.scss'], ['scripts']);
});

gulp.task('js', ['scripts'], function () {
    // body...
    gulp.watch(['scss/**/*.scss'], ['scripts']);
});