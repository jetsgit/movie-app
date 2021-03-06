angular.module('movieCore', ['ngResource'])
  .factory('PopularMovies', function ($resource) {
    var token = 'bluesuedeshoes'; // TBD
    return $resource('popular/:movieID', { movieID: '@id' }, {
      update: {
        method: 'PUT',
        headers: { 'authToken': token }
      },
      get: {
        method: 'GET',
        headers: { 'authToken': token }
      },
      query: {
        method: 'GET',
        headers: { 'authToken': token },
        isArray: true
      },
			save: {
				method: 'POST',
        headers: {'authToken': token}
			},
      remove: {
        method: 'DELETE',
        headers: { 'authToken': token }
      }
    });
  });

