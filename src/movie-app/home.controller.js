angular.module('movieApp')
  .controller('HomeController', function($scope, $interval, $exceptionHandler, omdbApi,  PopularMovies) {

    var results = [];
    var idx = 0;
    var findMovie = function (id) {
      omdbApi.find(id)
        .then( function(data) {
          $scope.result = data;
        })
        .catch( function(e) {
          $exceptionHandler(e);
        });
    };

    // Get PopularMovies List
    PopularMovies.query( function (data) {
      console.log("Result of query:" + data);
      results = data;
      findMovie(results[0]);
      $interval( function() {
        ++idx;
        findMovie(results[idx % results.length]);
      }, 5000);
    });
  });
