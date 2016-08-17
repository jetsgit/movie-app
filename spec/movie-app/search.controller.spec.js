describe('Search Controller', function() {
  var $scope;
  var $location;
  beforeEach(inject(function(_$controller_, _$location_) {
    $location = _$location_;
    $scope = {};

    // extract out into a function which we can pass into _$controller_ service
    var fn = function ($scope) {
      $scope.search = function () {
        if ($scope.query) {
          $location.path('/results').search('q', $scope.query);
          // $location.url = '/results?q=star%20wars';
        }
      }
    }
    // passing $location is optional since injector already providing this
    _$controller_(fn, { $scope: $scope, $location: $location });
  }));
  it('should redirect to the query results page for non-empty query', function() {
    $scope.query = 'star wars';
    $scope.search();
    expect($location.url()).toBe('/results?q=star%20wars');
  });
  it('should not redirect to query result for empty query', function() {
    $scope.query = '';
    $scope.search();
    expect($location.url()).toBe('');
  });
});
