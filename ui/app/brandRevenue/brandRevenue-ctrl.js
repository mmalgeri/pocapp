(function () {
  'use strict';

  angular.module('sample.brandRevenue')
    .controller('BrandRevenueCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
      var model = { 
        detail: {},   
        user: user
      };

      angular.extend($scope, {
        model: model,
        submit: function() {
          mlRest.brandRevenue($scope.model.user).then(function(response) {
            model.detail = response;
            
          });
        }
      });
    }]);
}());