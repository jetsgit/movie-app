angular.module('omdb', [])
  .factory('omdbApi', function($http, $q) {
    var service = {};
    var baseUrl = 'http://www.omdbapi.com/?apikey=6a32679c&v=1&';

    function httpPromise(url) {
      var deferred = $q.defer();
      $http.get(url)
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(e) {
          deferred.reject(e);
        });
      return deferred.promise;
    }

    service.search = function(query) {
      return httpPromise(baseUrl + 's=' + encodeURIComponent(query));
    }

    service.find = function(id) {
      return httpPromise(baseUrl + 'plot=full&' + 'i=' + id);
    }
    return service;
  });
