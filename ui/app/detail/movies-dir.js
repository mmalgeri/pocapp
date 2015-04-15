(function () {

  'use strict';

  var module = angular.module('sample.detail');

  module.directive('movies', [function () {
    return {
      restrict: 'E',
      templateUrl: '/detail/movies-dir.html'
    };
  }]);
}());
