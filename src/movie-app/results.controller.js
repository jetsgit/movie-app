angular.module('movieApp')
  .controller('ResultsController', function ($scope, $location, $exceptionHandler, $log, omdbApi) {
    // $scope.results = [];
    // $scope.results.push({data: { Title: 'Star Wars: Episode IV - A New Hope' }}); 
    // $scope.results.push({data: { Title: 'Star Wars: Episode V - The Empire Strikes Back' }});
    // $scope.results.push({data: { Title: 'Star Wars: Episode VI - Return of the Jedi' }});

    // Logging Levels
    
    // $log.log('standard log');
    // $log.info('info.log');
    // $log.error('error log');
    // $log.warn('warn log');
    // $log.debug('some debug information');
    var query = $location.search().q;
		$log.debug('Controller loaded with query:', query);
    omdbApi.search(query)
      .then( function(data) {
        $log.debug('Data returned for query: ', query, data);
        $scope.results = data.Search;
      })
      .catch( function(e) {
        $exceptionHandler(e);
        // throw 'Something went wrong!'
        // $scope.errorMessage = 'Something went wrong!'
      });
    $scope.expand = function(index, id) {
      omdbApi.find(id)
        .then( function(data) {
          console.log("Index is" + index);
          console.log("Id is" + id);
          $scope.results[index].data = data;
          $scope.results[index].open = true;
        });
    };
  });
