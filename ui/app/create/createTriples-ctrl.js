(function () {
  'use strict';

  angular.module('sample.createTriples')
    .controller('CreateTriplesCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
      var model = {
        triple: {
          subject: '',
          predicate: '',
          object: ''
        },
        
        user: user
      };

      angular.extend($scope, {
        model: model,
        submit: function() {
          mlRest.createTriple($scope.model.triple, {
            format: 'json',
            directory: '/triples/',
            extension: '.json',
            subject: $scope.model.triple.subject,
            predicate: $scope.model.triple.predicate,
            object: $scope.model.triple.object
            // TODO: add read/update permissions here like this:
            // 'perm:sample-role': 'read',
            // 'perm:sample-role': 'update'
          }).then(function(response) {
            win.location.href = '/' ;
          });
        }
      });
    }]);
}());
