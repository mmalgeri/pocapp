(function () {

  'use strict';

  var module = angular.module('sample.detail');

  module.directive('adhoc', [function () {
    return {
      restrict: 'E',
      templateUrl: '/detail/adhoc-dir.html'
    };
  }]);
}());
