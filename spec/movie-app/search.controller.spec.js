describe('Search Controller', function() {
  // Changed to dot notation for $scope.data.query
  var $scope;
  var $location;
  var $timout;

  beforeEach(module('movieApp'));

  beforeEach(inject(function(_$controller_, _$location_, _$timeout_) {
    $location = _$location_;
    $timeout = _$timeout_;
    $scope = {};
    $scope.data = {};
    _$controller_('SearchController', { $scope: $scope, $location: _$location_, $timeout: _$timeout_ });
    dump(angular.mock.dump($scope.digest));
  }));
  it('should redirect to the query results page for non-empty query', function() {
    $scope.data.query = 'star wars';
    dump(angular.mock.dump($scope.data.query));
    $scope.search();
    expect($location.url()).toBe('/results?q=star%20wars');
  });
  it('should not redirect to query result for empty query', function() {
    $scope.data.query = '';
    $scope.search();
    expect($location.url()).toBe('');
  });
  it('should redirect after 1 second of keyboard inactivity', function() {
    $scope.data.query = 'star wars';
    $scope.keyup();
    $timeout.flush();
    expect($timeout.verifyNoPendingTasks).not.toThrow();
    expect($location.url()).toBe('/results?q=star%20wars'); 
  });
  it('should cancel timeout in keydown', function() {
    $scope.data.query = 'star wars';
    $scope.keyup();
    $scope.keydown()
    expect($timeout.verifyNoPendingTasks).not.toThrow();
  });
});
