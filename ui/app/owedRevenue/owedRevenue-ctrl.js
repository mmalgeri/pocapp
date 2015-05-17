(function () {
  'use strict';

  angular.module('sample.owedRevenue')
    .controller('OwedRevenueCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
      var model = { 
        detail: {},   
        user: user
      };

      angular.extend($scope, {
        model: model,
        submit: function() {
          mlRest.owedRevenue($scope.model.user).then(function(response) {
            model.detail = response;
            
          });
        }
      });
    }]);
}());