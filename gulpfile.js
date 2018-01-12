const gulp = require('gulp');
const config = require('./sftp-config.json');

/**
 * Deploy task
 * Copies the files to the server
 *
 */
gulp.task('deploy', function() {
  const gutil = require('gulp-util');
  const ftp = require('vinyl-ftp');
  const conn = ftp.create({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    parallel: 10,
    reload: true,
    debug: function(d) {
      console.log(d);
    },
    log: gutil.log
  });

  return gulp
    .src('./dist/**/*', { base: './dist', buffer: false })
    .pipe(conn.newer('/videos.danting.ca/'))
    .pipe(conn.dest('/videos.danting.ca/'));
});

/**
 * PostCss task
 * Compiles stylesheets
 */
gulp.task('css', function() {
  const postcss = require('gulp-postcss');
  const cssnext = require('postcss-cssnext');
  const stylefmt = require('stylefmt');

  return gulp
    .src('./src/assets/css/postcss/**/*.css')
    .pipe(postcss([cssnext(), stylefmt]))
    .pipe(gulp.dest('./src/assets/css/'));
});

/**
 * Watch task
 * Watches local files and runs tasks
 * whenever an update is detected
 */
gulp.task('watch', function() {
  gulp.watch('./src/assets/css/postcss/**/*.css', function() {
    gulp.start('css');
  });
});
