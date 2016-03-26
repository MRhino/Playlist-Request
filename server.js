/* Load the HTTP library */
var newrelic = require('newrelic');
var http = require("http");
var SpotifyWebApi = require('spotify-web-api-node');

/* Create an HTTP server to handle responses */
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

//Credentials
var spotifyApi = new SpotifyWebApi ({
  clientId : 'd07085d429384f6586db0bb97d458c9e',
  clientSecret : 'b3f185feabc942c3bc2d4ea5375f6575',
  redirectUri : 'http://localhost:8888/callback'
});
/*
//Get Elvis' Albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
    console.log('Artist Albums', data.body);
  }, function(err) {
    console.error(err);
  });
*/

//Authorization Code flow
var scopes = ['playlist-modify-public', 'streaming', 'user-read-private'],
  redirectUri = 'http://localhost:8888/callback',
  clientId = 'd07085d429384f6586db0bb97d458c9e',
  state = 'Some-state-of-my-choice';

// Setting Credentials through the wrapper's constructor
var spotifyApi = new SpotifyWebApi({
  redirectUri : redirectUri,
  clientId : clientId
});

// Authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

//Authorize URL
console.log(authorizeURL);
console.log(authorizeURL.code);

/*
//Hardcoded Authorization code
var Credentials = {
  clientId : 'd07085d429384f6586db0bb97d458c9e',
  clientSecret : 'b3f185feabc942c3bc2d4ea5375f6575',
  redirectUri : 'http://localhost:8888/callback'
};

var spotifyApi = new SpotifyWebApi(Credentials);
console.log("Before authorizationCode");

//Code that was returned after requesting access
var code = 'AQDSQ7dh372HRjcd2026GY2CqZiIMwbUc2w7CfFFTjXaThYQ8MCBYZq8IQGC8nN007uINxa2HmMuupckuqdPma-BYsjQYqbKH0mTRZlfkzbU9INeXTsUSYvIcGKDuUJl9T2r4m3HFjCKqbhPMuuJl6ORtFyBy5CPMh4fBB0IlAV0qB1q-vsrhanoMY5c2ala93jNISInlCEGpMD0CdMZg_A0qoE085bMOlsHwc3e84VGr2Da38R3-gldFNdvHiO_-yof0Zy3dCSNSA';
console.log("After authorizationCode");

//Retireve an access token and refresh token
spotifyApi.authorizationCodeGrant(code)
  .then(function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
*/
