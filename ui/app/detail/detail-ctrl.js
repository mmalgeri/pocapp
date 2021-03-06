(function () {
  'use strict';

  angular.module('sample.detail')
    .controller('DetailCtrl', ['$scope', 'MLRest', '$routeParams', function ($scope, mlRest, $routeParams) {
      var uri = $routeParams.uri;
      var model = {
        // your model stuff here
        detail: {}
      };
      


      mlRest.getDocument(uri, { format: 'json' }).then(function(response) {
        
        model.detail = response.data;

   /*     if (model.detail.tweet !== undefined) {
          model.mode = 'tweet';
          console.log('mode is tweet'); 
        } else if (model.detail.reviews !== undefined) {
          model.mode = 'review';
          console.log('mode is review');
        }
          else if (model.detail.runtime !== undefined) {
          model.mode = 'movie';
          console.log('mode is movie');
        }
          else {
          model.mode = 'actor';
          console.log('mode is actor');
  */

          if ((model.detail.modeFlag === 'actorTweetMode')|| (model.detail.modeFlag === 'movieTweetMode')){
          model.mode = 'tweet';
          console.log('mode is tweet'); 
        } else if (model.detail.modeFlag === 'reviewMode') {
          model.mode = 'review';
          console.log('mode is review');
        }
          else if (model.detail.modeFlag === 'movieMode') {
          model.mode = 'movie';
          console.log('mode is movie');
        }
        else if (model.detail.modeFlag === 'adHocMode') {
          model.mode = 'actor';
          console.log('mode is adhoc but setting directive to actor for now');
        }
          else {
          model.mode = 'actor';
          console.log('mode is actor');

        }
        
      }); 

      angular.extend($scope, {
        model: model

      });
    }]);
}());
