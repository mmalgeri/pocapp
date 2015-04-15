(function () {

  'use strict';

  var module = angular.module('sample.detail');

  module.directive('reviews', [function () {
    return {
      restrict: 'E',
      templateUrl: '/detail/reviews-dir.html'
    };
  }]);
}());
