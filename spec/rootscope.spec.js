describe('rootScope', function() {
  var $rootScope;
  var $scope;

  var menuController = function($scope) {
    $scope.items = [
      'Beverages',
      'Condiments'
    ];
    // if ($scope.selected !== undefined) {
    //   $scope.message = 'You selected ' + $scope.items[$scope.selected];
    // }
    $scope.$on('selected', function () {
      $scope.message = 'You selected ' + $scope.items[$scope.selected];
    })
  };

  beforeEach(inject(function(_$controller_, _$rootScope_ ) {
    $rootScope = _$rootScope_;
    $rootScope.selected = 0;
    $scope = $rootScope.$new();
    _$controller_(menuController, {
      $scope: $scope
    });
  }));

  it('should demo rootScope', function() {
    $scope.$emit('selected')
    dump(angular.mock.dump($rootScope));
    dump( angular.mock.dump($scope) );
    console.log('root', $rootScope.$countChildScopes());
    console.log('child', $scope.$countChildScopes());
    // console.log($scope);
    expect($scope.message).toBe('You selected Beverages');
  });
});
