(function () {
  'use strict';

  angular.module('sample.loadData')
    .controller('LoadDataCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
      var model = {
        topicAndSentiment: {
          topic: '',
          sentiment: '',
          posOrNeg: ''
        },
        
        user: user
      };

      angular.extend($scope, {
        model: model,
        editorOptions: {
          height: '100px',
          toolbarGroups: [
            { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
            { name: 'links' }
          ],
          //override default options
          toolbar: '',
          /* jshint camelcase: false */
          toolbar_full: ''
        },
        submit: function() {
          mlRest.createSentiment($scope.model.topicAndSentiment, {
            format: 'xml',
            directory: '/sentiments/',
            extension: '.xml',
            topic: $scope.model.topicAndSentiment.topic,
            sentiment: $scope.model.topicAndSentiment.sentiment,
            posOrNeg: $scope.model.topicAndSentiment.posOrNeg
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
