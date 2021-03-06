
angular.module('sample', [
  'ngRoute', 'ngCkeditor', 'sample.user', 'sample.search', 'sample.common', 'sample.detail',
  'ui.bootstrap', 'gd.ui.jsonexplorer', 'sample.create', 'sample.createTriples', 
  'sample.loadData', 'sample.getReviews', 'sample.owedRevenue', 'sample.taxIncentives', 'sample.brandRevenue', 'sample.lifestyleRevenue'
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
      .when('/createTriples', {
        templateUrl: '/create/createTriples.html',
        controller: 'CreateTriplesCtrl'
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
      .when('/agentOntology', {
        templateUrl: '/agentOntology.html'
      })
      .when('/owedRevenue', {
        templateUrl: '/owedRevenue/owedRevenue.html',
        controller: 'OwedRevenueCtrl'
      })
      .when('/taxIncentives', {
        templateUrl: '/taxIncentives/taxIncentives.html',
        controller: 'TaxIncentivesCtrl'
      })
      .when('/brandRevenue', {
        templateUrl: '/brandRevenue/brandRevenue.html',
        controller: 'BrandRevenueCtrl'
      })
      .when('/lifestyleRevenue', {
        templateUrl: '/lifestyleRevenue/lifestyleRevenue.html',
        controller: 'LifestyleRevenueCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .filter('decode', function() {
    return window.decodeURIComponent;
  });
