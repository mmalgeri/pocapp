(function () {

  'use strict';

  var module = angular.module('sample.detail');

  module.directive('tweets', [function () {
    return {
      restrict: 'E',
      templateUrl: '/detail/tweets-dir.html'
    };
  }]);
}());
