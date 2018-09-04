var
    gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    pug         = require('gulp-pug'),
    inlineCss   = require('gulp-inline-css'),
    tiny        = require('gulp-tinypng-compress');

// Разворачивает локальный сервер + обновление страницы при сохранении файлов .pug
gulp.task('browser-sync', ['inlineCss'], function () {
    browserSync({
        server: {
            baseDir: '../'
        },
        notify: false,
        open: true,
        // online: false,
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
}); 

// Компрессор .png и .jpg
gulp.task('tiny', function () {
    return gulp.src('img/tiny/**/*.{png,jpg,jpeg}')
        .pipe(tiny({
            key: 'MqUNEWa0vy_9z5Wj_EQydwHBCRK4_8x8',
            sigFile: 'img/.tinypng-sigs',
            summarize: true,
            log: true
        }))
        .pipe(gulp.dest('img'))
});

// .pug -> .html
gulp.task('pug', function buildHTML() {
    return gulp.src('index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.reload({ stream: true }))
});

// Css-inliner 
gulp.task('inlineCss', ['pug'], function () {
    return gulp.src('../index.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('../'))
        .pipe(browserSync.reload({ stream: true }))
});


// Быстрая сборка
gulp.task('build', ['pug', 'inlineCss', 'tiny']);

// Сборка во время редактирования
gulp.task('watch', ['browser-sync', 'pug', 'inlineCss', 'tiny'], function () {
    gulp.watch('img/tiny/*.{png,jpg,jpeg}', ['tiny']);
    gulp.watch('./**/*.pug', ['pug', 'inlineCss']);
});