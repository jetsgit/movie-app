angular.module('movieApp', ['omdb','ngRoute', 'ui.bootstrap', 'movieCore'])
  .config( function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'movie-app/home.html',
        controller: 'HomeController'
      })
      .when('/results', {
        templateUrl: 'movie-app/results.html',
        controller: 'ResultsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
