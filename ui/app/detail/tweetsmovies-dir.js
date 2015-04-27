(function () {

  'use strict';

  var module = angular.module('sample.detail');

  module.directive('tweetsmovies', [function () {
    return {
      restrict: 'E',
      templateUrl: '/detail/tweetsmovies-dir.html'
    };
  }]);
}());
