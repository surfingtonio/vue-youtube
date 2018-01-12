const gulp = require( 'gulp' );
const gutil = require( 'gulp-util' );
const ftp = require( 'vinyl-ftp' );
const watch = require('gulp-watch');

const config = require('./sftp-config.json');

const src = ['./dist/**/*']
const dst = '/videos.danting.ca/';
const base = './dist';

/**
 * Deploy task
 * Copies the files to the server
 *
 */
gulp.task('deploy', function() {

  const conn = ftp.create({
    host:     config.host,
    user:     config.user,
    password: config.password,
    port:     config.port,
    parallel: 10,
    reload:   true,
    debug:    function(d){ console.log(d); },
    log:      gutil.log
  });

  return gulp.src(src, { base: base, buffer: false })
    .pipe(conn.newer(dst))
    .pipe(conn.dest(dst));

} );

/**
 * Watch deploy task
 * Watches the local copy for changes and copies the new files
 * to the server whenever an update is detected
 */
gulp.task('watch', function () {
  watch(src, function () {
    setTimeout(function() {
      gulp.start('deploy')
    }, 1000)
  });
});
