describe('omdb service', function() {
  var movieData =  {"Search": [{"Title":"Star Wars","Year":"1983","Rated":"N/A","Released":"01 May 1983","Runtime":"N/A","Genre":"Action, Adventure, Sci-Fi","Director":"N/A","Writer":"N/A","Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones","Plot":"N/A","Language":"English","Country":"USA","Awards":"N/A","Poster":"http://ia.media-imdb.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg","Metascore":"N/A","imdbRating":"7.8","imdbVotes":"347","imdbID":"tt0251413","Type":"game","Response":"True"}] };

  var movieDataById = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 39 wins & 28 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg","Metascore":"92","imdbRating":"8.7","imdbVotes":"908,085","imdbID":"tt0076759","Type":"movie","Response":"True"};
  
  var omdbApi = {};
  var $httpBackend;
  beforeEach(module('omdb'));
  beforeEach(inject( function(_omdbApi_, _$httpBackend_) {
    omdbApi = _omdbApi_;
    $httpBackend = _$httpBackend_;
  }));

  it('should return search movie data', function() {
    var response;
    var expectedUrl =  'http://www.omdbapi.com/?v=1&s=star%20wars';
    
    // var expectedUrl = function (url) {
    //   return url.indexOf('http://www.omdbapi.com') !== -1;
    // }

    // var expectedUrl = /http:\/\/www.omdbapi.com\/\?v=1&s=star%20wars/;

    $httpBackend.when('GET', expectedUrl)
      .respond(200, movieData);
    omdbApi.search('star wars')
      .then( function (data) {
        response = data;
    });
    $httpBackend.flush();
    expect(response).toEqual(movieData);
    // console.log(angular.mock.dump(movieData))
    // Anonymous object Literal to prototype functions
    
    // angular.mock.module({
    //   'omdbApi': {
    //     search: function(query) {
    //       return movieData;
    //     }
    //   }
    // });

    // Using function constructor
    
    // angular.mock.module( function ($provide) {
    //   $provide.factory('omdbApi', function () {
    //     return {
    //       search: function (query) {
    //         return movieData;
    //       }
    //     }
    //   });
    // } );

    // using a string alias for mock module
    
  });
  it('should return movie data by id', function() {
    var response;

    $httpBackend.expect('GET', 'http://www.omdbapi.com/?v=1&i=tt0076759' )
      .respond(200, movieDataById);
    
    omdbApi.find('tt0076759')
      .then( function(data) {
        response = data;
      });

    $httpBackend.flush();
    expect(response).toEqual(movieDataById);
  });
});
