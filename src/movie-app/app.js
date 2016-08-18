angular.module('movieApp', ['omdb','ngRoute', 'ui.bootstrap'])
  .config( function ($routeProvider) {
    $routeProvider
      .when('/results', {
        templateUrl: 'movie-app/results.html',
        controller: 'ResultsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
