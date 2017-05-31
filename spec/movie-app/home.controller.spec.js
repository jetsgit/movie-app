describe('Home Controller', function() {
  var results = [
    {
      "Title": "Star Wars: Episode IV - A new Hope",
      "imdbID": "tt0076759"
    },
    {
      "Title": "Star Wars: Episode V - The Empire Strikes Back",
      "imdbID": "tt0080684"
    },
    {
      "Title": "Star Wars: Episode VI - Return of the Jedi",
      "imdbID": "tt0086190"
    }
  ];
  var $scope;
  var $interval;
  var $q;
  var $controller;
  var $rootScope;
  var PopularMovies;
  var $exceptionHandler;

  beforeEach(module('movieApp'));

  beforeEach(module(function($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));

  beforeEach(module(function($logProvider) {
    // Set debugging level, default is true
    $logProvider.debugEnabled(true)
  }));


  beforeEach(inject(function(_$q_, _omdbApi_) {
    spyOn(_omdbApi_, 'find').and.callFake( function () {
      var deferred = _$q_.defer();
      var args = _omdbApi_.find.calls.mostRecent().args[0];
      if (args === 'tt0076759') {
        deferred.resolve(results[0]);
      } else if (args === 'tt0080684'){
        deferred.resolve(results[1]);
      } else if (args === 'tt0086190'){
        deferred.resolve(results[2])
      } else if (args === 'ttError'){
        deferred.reject('error finding movie')
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });
  }));

  beforeEach(inject(function(_$controller_, _$interval_, _$q_, _$rootScope_, _$exceptionHandler_, _$log_, _omdbApi_, _PopularMovies_) {
    $scope = {};
    $interval = _$interval_;
    $q = _$q_;
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    omdbApi = _omdbApi_;
    PopularMovies = _PopularMovies_;
    $exceptionHandler = _$exceptionHandler_;
    $log = _$log_;
  }));

  it('should rotate movies every 5 seconds', function() {
    // dump(angular.mock.dump(results))
    spyOn(PopularMovies, 'query').and.callFake( function (cb) {
      // var deferred = $q.defer();
      // deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190']);
      // return deferred.promise;
      cb(['tt0076759', 'tt0080684', 'tt0086190']);
    });

    $controller('HomeController',{
      $scope: $scope,
      $interval: $interval,
      omdbApi: omdbApi,
      PopularMovies: PopularMovies
    });

    $rootScope.$apply();

    expect($scope.result.Title).toBe(results[0].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[1].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[2].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[0].Title);

    // Zero logs
    // $log.reset();
    
    // Test that logs are empty
    // $log.assertEmpty();
    
    // console.log(angular.mock.dump($log.log.logs));
    // console.log(angular.mock.dump($log.info.logs));
    // console.log(angular.mock.dump($log.error.logs));
    // console.log(angular.mock.dump($log.warn.logs));
    // console.log(angular.mock.dump($log.debug.logs));
  });
  
  it('should handle error', function() {
    // dump(angular.mock.dump($scope.result.imdbID))
    spyOn(PopularMovies, 'query').and.callFake( function(cb) {
      // var deferred = $q.defer();
      // deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190', 'ttError']);
      // return deferred.promise;
      cb(['tt0076759', 'tt0080684', 'tt0086190', 'ttError']);
    });

    $controller('HomeController',{
      $scope: $scope,
      $interval: $interval,
      omdbApi: omdbApi,
      PopularMovies: PopularMovies
    });

    $rootScope.$apply();
    expect($scope.result.Title).toBe(results[0].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[1].Title);
    // should update after 5 seconds
    $interval.flush(5000);
    expect($scope.result.Title).toBe(results[2].Title);
    // should update after 5 seconds
    $interval.flush(5000);

    expect($exceptionHandler.errors).toEqual(['error finding movie']);
  })
});
