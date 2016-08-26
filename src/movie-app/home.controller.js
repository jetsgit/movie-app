angular.module('movieApp')
  .controller('HomeController', function($scope, $interval, omdbApi, $exceptionHandler, PopularMovies) {
    var results = [];
    $scope.result = results[0];
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
    PopularMovies.get()
      .then( function (data) {
        // var data = ['tt0076759', 'tt0080684', 'tt0086190'];
        results = data;
        findMovie(results[0]);
        $interval( function() {
          ++idx;
          findMovie(results[idx % results.length]);
        }, 5000);
      });
  });
