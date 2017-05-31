describe('Results Controller', function() {
  
  var results = {
    "Search": [
      {
        "Title": "Star Wars: Episode IV - A New Hope",
        "Year": "1977",
        "imbID": "tt0076759",
        "Type": "movie"
      },
      {
        "Title": "Star Wars: Episode V - The Empire Strikes Back",
        "Year": "1980",
        "imbID": "tt0080684",
        "Type": "movie"
      },
      {
        "Title": "Star Wars: Episode VI - Return of the Jedi",
        "Year": "1983",
        "imbID": "tt0086190",
        "Type": "movie"
      }
    ]
  };

  // mocking angular promises in our tests
  var $controller;
  var $q;
  var $rootScope;
  var $scope;
  var omdbApi;
  var $location;
  var $exceptionHandler;
  var $log;

  // beforeEach(module('omdb'));

  beforeEach(module('movieApp'));

  beforeEach(module(function($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(module(function($logProvider) {
    // Set debugging level, default is true
    $logProvider.debugEnabled(true)
  }));

  beforeEach(inject(function(_$controller_, _$location_, _$q_, _$rootScope_, _$exceptionHandler_, _$log_,  _omdbApi_) {
    $controller = _$controller_;
    $scope = {};
    $location = _$location_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    omdbApi = _omdbApi_;
    $exceptionHandler = _$exceptionHandler_;
    $log = _$log_;
  }));

  it('should load search results', function() {
    spyOn(omdbApi, 'search').and.callFake( function () {
      var deferred = $q.defer();
      deferred.resolve(results);
      return deferred.promise;
    });
    $location.search('q', 'star wars');
    $controller('ResultsController', { $scope: $scope });
    // below manually makes sure deferred promises are processed, in browser
    // this is done automatically
    $rootScope.$apply();
    expect($scope.results[0].Title).toBe(results.Search[0].Title);
    expect($scope.results[1].Title).toBe(results.Search[1].Title);
    expect($scope.results[2].Title).toBe(results.Search[2].Title);
    expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    expect($log.debug.logs[0]).toEqual(['Controller loaded with query:', 'star wars']);
    expect($log.debug.logs[1]).toEqual(['Data returned for query: ', 'star wars', results]);

    console.log(angular.mock.dump($log.debug.logs));
  });
  it('should set result status to error', function() {
    spyOn(omdbApi, 'search').and.callFake( function() {
      var deferred = $q.defer();
      deferred.reject('Something went wrong!');
      return deferred.promise;
    });
    $location.search('q', 'star wars');
    // $controller('ResultsController', { $scope: $scope });
    // $rootScope.$apply();
    // dump(angular.mock.dump($scope.errorMessage));
      $controller('ResultsController', { $scope: $scope });
      $rootScope.$apply();
      // dump($exceptionHandler.errors);
      expect($exceptionHandler.errors).toEqual(['Something went wrong!']);
  });
});
