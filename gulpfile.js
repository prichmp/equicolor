var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');


    // "clean": "rimraf build",
    // "prebuild": "npm run clean",
    // "build": "webpack --config config/webpack/index.js",
    // "build:prod": "cross-env NODE_ENV=production npm run build",
    // "postbuild": "webpack --config config/webpack/server.js",
    // "prestart": "npm run build",
    // "start": "node build/server.js",
    // "start:prod": "cross-env NODE_ENV=production npm start",
    // "test": "karma start config/test/karma.conf.js",
    // "lint": "tslint \"src/**/**.ts*\""


gulp.task('default',['build'], function(done)
{
  done();
});

gulp.task('clean', function (cb) {
  return del([
    'dist/**/*'
  ]);
})

var opts = {
  env:
  {
    FORCE_COLOR: "true"
  },
  verbose:true
}

gulp.task('build', shell.task(['tsc'], opts));
gulp.task('test', ['build'], shell.task(['npm test'], opts));
