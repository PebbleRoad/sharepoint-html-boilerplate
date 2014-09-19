'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('src/styles/*.scss')
        .pipe($.sass({
            style: 'nested'
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('src/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});


gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    var assets = $.useref.assets({searchPath: '{.tmp,src}' });

    return gulp.src('src/*.html')        
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())        
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});


/*------------------------------------*\
    JADE
\*------------------------------------*/

gulp.task('jade', function(){

    return gulp.src([
        './src/jade/**/*.jade',
        '!**/_*'        
        ])
        .pipe($.jade({
            pretty : true
        }))
        .pipe(gulp.dest('./src/'))
    ;

});

gulp.task('fonts', function () {
    return gulp.src(['src/fonts/*.{eot,svg,ttf,woff}', 'src/bower_components/fontawesome/fonts/*'])
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('replacefontPath', ['html'], function(){

    return gulp.src('dist/styles/*.css')
        .pipe($.replace('bower_components/fontawesome/', ''))
        .pipe(gulp.dest('dist/styles'));
})

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('copycss', function(){

    return gulp.src(['.tmp/styles/ie.css', '.tmp/styles/print.css'])
        .pipe(gulp.dest('dist/styles'));
})

gulp.task('build', ['html', 'images', 'fonts', 'extras', 'copycss', 'replacefontPath']);

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('src'))
        .use(connect.static('.tmp'))
        .use(connect.directory('src'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});


gulp.task('watch', ['connect'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'src/*.html',
        '.tmp/styles/*.css',
        'src/scripts/**/*.js',
        'src/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/jade/**/*.jade', ['jade']);    
});