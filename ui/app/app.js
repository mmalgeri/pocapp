
angular.module('sample', [
  'ngRoute', 'ngCkeditor', 'sample.user', 'sample.search', 'sample.common', 'sample.detail',
  'ui.bootstrap', 'gd.ui.jsonexplorer', 'sample.create', 'sample.loadData', 'sample.getReviews'
])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    'use strict';

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '/search/search.html'
      })
      .when('/create', {
        templateUrl: '/create/create.html',
        controller: 'CreateCtrl'
      })
      .when('/detail', {
        templateUrl: '/detail/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/profile', {
        templateUrl: '/user/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/loadData', {
        templateUrl: '/create/loadData.html',
        controller: 'LoadDataCtrl'
      })
      .when('/getReviews', {
        templateUrl: '/create/getReviews.html',
        controller: 'GetReviewsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
