describe('Search Controller', function() {

  var $scope;
  var $location;

  beforeEach(module('movieApp'));

  beforeEach(inject(function(_$controller_, _$location_) {
    $location = _$location_;
    $scope = {};
    _$controller_('SearchController', { $scope: $scope, $location: $location });
    dump(angular.mock.dump($scope.digest));
  }));
  it('should redirect to the query results page for non-empty query', function() {
    $scope.query = 'star wars';
    dump(angular.mock.dump($scope));
    $scope.search();
    expect($location.url()).toBe('/results?q=star%20wars');
  });
  it('should not redirect to query result for empty query', function() {
    $scope.query = '';
    $scope.search();
    expect($location.url()).toBe('');
  });
});
