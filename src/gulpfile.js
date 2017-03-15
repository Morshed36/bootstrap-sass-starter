var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');  
var uglify = require('gulp-uglify'); 


var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    cssDir: '../app/assets/css',
    fontDir: '../app/assets/fonts'
};

gulp.task('css', function() {
    return gulp.src('scss/app.scss')
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
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
];

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../app/assets/js'));
});


gulp.task('default', ['css', 'fonts', 'scripts'], function () {
	// body...
	gulp.watch(['scss/**/*.scss'], ['css']);
});
gulp.task('js', ['scripts'], function () {
    // body...
    gulp.watch(['scss/**/*.scss'], ['scripts']);
});