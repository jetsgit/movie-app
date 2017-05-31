angular.module('movieApp', ['omdb','ngRoute', 'ui.bootstrap', 'movieCore','ngMockE2E'])
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
  })
  .config( function ($logProvider) {
    $logProvider.debugEnabled(false);
  })
  .run( function($httpBackend) {
    var data = ['tt0118799', 'tt0089606', 'tt0095765', 'tt0116209', 'tt0103791', 'tt0103994', 'tt0099699', 'tt0211915', 'tt0138097', 'tt0056172', 'tt0056172', 'tt0106387', 'tt0190590', 'tt0089755', 'tt4698684', 'tt0249462', 'tt3544112', 'tt0434124', 'tt0185014', 'tt0120802'];
    var headers = {
      headers: { 'Content-type': 'application/json' }
    };

    $httpBackend.whenGET( function(s) {
      return (s.indexOf('popular') !== -1);
    })
    .respond(200, data, headers);

    // allow all other requests
    $httpBackend.whenGET(/.*/).passThrough();
  });
