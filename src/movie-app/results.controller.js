angular.module('movieApp')
  .controller('ResultsController', function ($scope, $location, omdbApi) {
    // $scope.results = [];
    // $scope.results.push({data: { Title: 'Star Wars: Episode IV - A New Hope' }}); 
    // $scope.results.push({data: { Title: 'Star Wars: Episode V - The Empire Strikes Back' }});
    // $scope.results.push({data: { Title: 'Star Wars: Episode VI - Return of the Jedi' }});

    var query = $location.search().q;
    omdbApi.search(query)
      .then( function(data) {
        $scope.results = data.Search;
      })
      .catch( function() {
        $scope.errorMessage = 'Something went wrong!'
      });
  });
