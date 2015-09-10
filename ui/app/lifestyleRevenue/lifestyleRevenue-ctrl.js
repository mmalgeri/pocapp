(function () {
  'use strict';

  angular.module('sample.lifestyleRevenue')
    .controller('LifestyleRevenueCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
      var model = { 
        detail: {},   
        user: user
      };

      angular.extend($scope, {
        model: model,
        submit: function() {
          mlRest.lifestyleRevenue($scope.model.user).then(function(response) {
            model.detail = response;
            
          });
        }
      });
    }]);
}());