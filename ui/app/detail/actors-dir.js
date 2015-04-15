(function () {

  'use strict';

  var module = angular.module('sample.detail');

  module.directive('actors', [function () {
    return {
      restrict: 'E',
      templateUrl: '/detail/actors-dir.html'
    };
  }]);
}());
