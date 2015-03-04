(function () {
  'use strict';

  angular.module('sample.getReviews')
    .controller('GetReviewsCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
       var model = {
        movieData: {
          movie: ''
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
          mlRest.callExtension('getReviews', 
            {
              method: 'GET',
              data: model.movieData.movie,
              user:user,
              params: {
                'movie': model.movieData.movie
              },
              headers: {
                'Content-Type': 'application/text'
              }
            }
            ).then(
              function(response) {
                console.log("Got Movie");
                win.location.href = '/' ;
              }
          );
        }
      });
    }]);
}());
