/*jshint node: true */

'use strict';

/*
 * @author Dave Cassel - https://github.com/dmcassel
 *
 * This file contains the Gulp tasks you can run. As written, you'll typically run two processes :
 * $ gulp
 * - this will watch the file system for changes, running JSHint, compiling lesscss.js files, and minifying JS
 * $ gulp server
 * - run a node server, hosting the AngularJS application
 */

var gulp = require('gulp');

var argv = require('yargs').argv;
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var karma = require('karma').server;
var path = require('path');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var options = {
  appPort: argv['app-port'] || 9070,
  mlHost: argv['ml-host'] || 'localhost',
  mlPort: argv['ml-port'] || '7020'
};

gulp.task('jshint', function() {
  gulp.src(['ui/app/**/*.js', '!ui/app/bower_components/**/*.js', '!ui/app/scripts/vendor/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Less
gulp.task('less', function() {
  return gulp.src('ui/app/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('ui/app/styles/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(['./ui/app/**/*.js', '!ui/app/bower_components/**/*.js', '!ui/app/scripts/vendor/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('./ui/app/**/*.js', ['jshint', 'scripts']);
  gulp.watch('./ui/app/styles/*.less', ['less']);
});

gulp.task('test', function() {
  karma.start({
    configFile: path.join(__dirname, './karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('autotest', function() {
  karma.start({
    configFile: path.join(__dirname, './karma.conf.js'),
    autoWatch: true
  }, function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('server', function() {
  var server = require('./server.js').buildExpress(options);
  server.listen(options.appPort);
});

// Default Task
gulp.task('default', ['jshint', 'less', 'scripts', 'watch']);

// THE FOLLOWING TASKS WERE ADDED FOR THE POCAPP PROJECT BY MMALGERI 

// Get top 10 movies with triples
gulp.task('getMovies', function() {
var request = require('request');
request("http://localhost:7020/v1/resources/getMovies", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
    else {console.log("There was an error getting movies" + body + response) 
  }
});
});

// Get top 10 movie actors with triples
gulp.task('getMovieActors', function() {
var request = require('request');
request("http://localhost:7020/v1/resources/getMovieActors", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
    else {console.log("There was an error getting movie actors " + body + response) 
  }
});
});

// Get top 10 movie reviews
gulp.task('getMovieReviews', function() {
var request = require('request');
request("http://localhost:7020/v1/resources/getMovieReviews", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
    else {console.log("There was an error getting movie reviews " + body + response) 
  }
});
});

// Get top 10 movie tweets
gulp.task('getMovieTweets', function() {
var request = require('request');
request("http://localhost:7020/v1/resources/getMovieTweets", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
    else {console.log("There was an error getting movie tweets " + body + response) 
  }
});
});

// Get top 10 movie actor tweets
gulp.task('getMovieActorTweets', function() {
var request = require('request');
request("http://localhost:7020/v1/resources/getMovieActorTweets", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body); 
  }
    else {console.log("There was an error getting movie actor tweets " + body + response) 
  }
});
});

// Get All MovieApp Data  Task
gulp.task('getAllMovieData', ['getMovies', 'getMovieActors', 'getMovieReviews', 'getMovieTweets', 'getMovieActorTweets']);
