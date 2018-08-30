var
    gulp    = require('gulp'),
    pug     = require('gulp-pug');

gulp.task('pug', function buildHTML() {
    return gulp.src('index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('../'))
});

gulp.task('build',  ['pug']);