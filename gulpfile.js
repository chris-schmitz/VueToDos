var gulp = require('gulp');
var browserify = require('browserify');
var vueify = require('vueify');
var source = require('vinyl-source-stream');

gulp.task('default', ['watch']);

gulp.task('build-app', function (){
    return browserify('src/app/app.js')
        .transform(vueify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public'));
});

gulp.task('font-awesome', ['icons', 'fonts']);

gulp.task('icons', function (){
    return gulp.src('./node_modules/font-awesome/css/**.*')
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('fonts', function (){
    return gulp.src('./node_modules/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('watch', function (){
    gulp.watch('src/app/**/*.{js,vue,scss}', ['build-app']);
});
