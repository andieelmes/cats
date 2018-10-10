var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    cleancss = require('gulp-clean-css'),
    notify = require("gulp-notify"),
    cache = require('gulp-cached'),
    rigger = require('gulp-rigger'),
    reload = browserSync.reload,
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    babel = require('gulp-babel');

  var path = {
    build: {
      html: 'build',
      js: 'build/js',
      css: 'build/css',
    },
    src: {
      html: 'src/**/*.jade',
      js: 'src/js/main.js',
      style: 'src/style/main.scss',
    },
    watch: {
      html: 'src/**/*.jade',
      js: 'src/js/**/*.js',
      style: 'src/style/**/*.scss'
    }
  };

  var config = {
    server: {
      baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 7777,
    logPrefix: "Building::",
    notify: false,
  };


  gulp.task('html:build', function () {
    gulp.src(path.src.html)
      .pipe(cache('jading...'))
      .pipe(jade({pretty: true}))
      .on('error', notify.onError(function (err) {
        return {
          title: 'Jade',
          message: err.message
        };
      }))
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true}));
  });

  gulp.task('js:build', function () {
    browserify('src/js/main.js')
      .transform(babelify.configure({
        plugins: ["transform-runtime"],
        presets : [
          "es2015",
          "stage-3",
          "stage-2",
          "stage-1"
        ]
      }))
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('build/js/'))
      .pipe(reload({stream: true}))
  });


  gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
          includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(prefixer({
            browsers: ['last 4 versions','> 1%','Android 4.4','ios_saf >=7']
        }))
        .pipe(gulpif(argv.prod, cleancss()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
  });

  gulp.task('build', [
    'html:build',
    'js:build',
    'style:build'
  ]);

  gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
      gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
      gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
      gulp.start('js:build');
    });

  });

  gulp.task('webserver', function () {
    browserSync(config);
  });

  gulp.task('default', ['build', 'webserver', 'watch']);
