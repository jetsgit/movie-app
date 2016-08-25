describe('Name of the group', function() {
  var countDownController = function ($scope) {
    if ($scope.nowTime.getFullYear() === $scope.nextYear) {
      $scope.message = 'Happy New Year!';
    } else {
      $scope.message = 'Keep on counting down...';
    }
  }

  var $controller;
  var $scope;

  beforeEach(inject(function(_$controller_) {
    $scope = {};
    $controller = _$controller_;
  }));

  it('should increment the time by the given hours', function() {
    var addHours = function (d, h) {
      d.setTime(d.getTime() + (h*60*60*1000));
    }

    var base = new angular.mock.TzDate(0, '2014-12-31T22:00:00Z');
    var hoursToAdd = 1;

    spyOn(base, 'setTime');
    addHours(base, hoursToAdd);

    expect(base.setTime).toHaveBeenCalledWith(1420066800000);
  });
});
