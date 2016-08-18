describe('MovieCore', function() {
  var PopularMovies;
  var $httpBackend;

  beforeEach(module('movieCore'));

  beforeEach(inject( function (_PopularMovies_, _$httpBackend_) {
    PopularMovies = _PopularMovies_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach( function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  } )

  it('should create popular movie', function() {

    // var expectedData = ( function (data) {
    // dump(angular.mock.dump(data));
      // return angular.fromJson(data).movieID === 'tt0076759';
    var expectedData = {"movieID":"tt0076759", "description":"Great movie!"}
    // });
    
    $httpBackend.expectPOST(/./, expectedData)
      .respond(201);
    var popularMovie = new PopularMovies({
      movieID: 'tt0076759',
      description: 'Great movie!'
    });

    popularMovie.$save();
    expect($httpBackend.flush).not.toThrow();
  });
  it('should get popular movie by id', function() {
    $httpBackend.expectGET('popular/tt0076759').respond(200);
    PopularMovies.get({ movieID: 'tt0076759' });
    $httpBackend.flush(1);
  });
  it('should update popular movie', function() {
    $httpBackend.expectPUT('popular')
      .respond(200);
    var popularMovie = new PopularMovies({
      movieID: 'tt0076759',
      description: 'Great movie!'
    });
    popularMovie.$update();
    $httpBackend.flush(1);
  });
  it('should authenticate requests', function() {
    // Below, using function
    // var expectedHeaders = function (headers) {
      // dump(angular.mock.dump(headers));
      // return true;
      // return angular.fromJson(headers.authToken === 'bluesuedeshoes');
    // };
    // Below: using object, must be exact
      // DUMP: '{
      //   "authToken": "bluesuedeshoes",
      //   "Accept": "application/json, text/plain, */*"
      // }'
    // var expectedHeaders = {"authToken": "bluesuedeshoes", "Accept": "application/json, text/plain, */*"}
    // $httpBackend.expectGET('popular/tt0076759', expectedHeaders)
    //   .respond(200);

    // Below we switch to matching any route, and use headerData var

    var headerData = function (headers) {
      return headers.authToken === 'bluesuedeshoes'
    }

    var matchAny = /.*/;
    // whenGET can re reused, so is OK for both 'query' and 'get'
    $httpBackend.whenGET(matchAny, headerData)
      .respond(200);
    // We use expect for 1 time requests, and for precision
    $httpBackend.expectPOST(matchAny,matchAny, headerData)
      .respond(200);
    $httpBackend.expectPUT(matchAny, matchAny, headerData)
      .respond(200);
    $httpBackend.expectDELETE(matchAny, headerData)
      .respond(200);
    var popularMovie = {id: 'tt0076759', description: 'This is great!'}

    PopularMovies.query();
    PopularMovies.get({movieID: 'tt0076759'})
    new PopularMovies(popularMovie).$save();
    new PopularMovies(popularMovie).$update();
    new PopularMovies(popularMovie).$remove();
    // $httpBackend.flush(1);  
    // $httpBackend.flush(1);  
    // $httpBackend.flush(1);
    // $httpBackend.flush(1);
    // $httpBackend.flush(1);
    expect($httpBackend.flush).not.toThrow();
  });
}); 
