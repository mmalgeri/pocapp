// Keys to access data sources
// The Movie Database api key
var tmdbapikey = "169f143a4bf429e2b105a8da52f93f61";
// Rotten Tomatoes api key
var rtapikey = "ek43fd5d4pgnkr44m24de9wr";


// rtGetTop10MovieIds returns array containing ids of the top 10 movies
// The function is called at the end to demonstrate what it does

exports.rtGetTop10MovieIds = function rtGetTop10MovieIds () {

var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=",rtapikey)
var movieInfoItr = xdmp.httpGet(uri, {format:'json'})
    

// Need to move movieItr twice to get to movielist
// movieList is a JSON object that includes the "done" key and "value" key. 
// Value key has a value of "movies", which is an array of the 10 movies
var movieOuterObject = movieInfoItr.next()
movieOuterObject = movieInfoItr.next()
  
// movieArray is just the movie array portion of movieList
var  movieArray = movieOuterObject.value.root.movies

// movieIds gives ids of movies
var movieIds=[];
for (i = 0; i < movieOuterObject.value.root.movies.toObject().length ; i++) {
     movieIds.push(movieArray[i].id);
}                                                

return movieIds;
}

// rtGetTop10Movies returns an array containingthe top 10 movies
exports.rtGetTop10Movies = function rtGetTop10Movies () {

var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=",rtapikey);
var movieInfoItr = xdmp.httpGet(uri, {format:'json'});

// Need to move movieItr twice to get to movielist
// movieList is a JSON object that includes the "done" key and the "value" key. 
// Value key has a value of "movies", which is an array of the 10 movies
var movieOuterObject = movieInfoItr.next();
movieOuterObject = movieInfoItr.next();

  
// movieArray is just the movie array portion of movieList
var  movieArray = movieOuterObject.value.root.movies;
                          
                                
return movieArray;
}

exports.rtGetMovieActors = function rtGetMovieActors( id ) {
var actorArray = new Array();

  
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",id,"/cast.json?apikey=",rtapikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieCast = movieInfo.value.toObject().cast;
    
    for (j=0; j<movieCast.length; j++) {
      
      var actor = movieCast[j];
      actor['movieId'] = id;
      actorArray.push(actor);
    }
  return actorArray;
}

// rtGetTop10MovieIdsAndTitles returns array of the ids of the top 10 movies and Titles
// The function is called at the end to demonstrate what it does

exports.rtGetTop10MovieIdsAndTitles = function rtGetTop10MovieIdsAndTitles () {

var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=",rtapikey)
var movieInfoItr = xdmp.httpGet(uri, {format:'json'})
xdmp.sleep(250);
    

// Need to move movieItr twice to get to movielist
// movieList is a JSON object that includes "done" key and "value" key. 
// Value key has a value of "movies", which is an array of the 10 movies
var movieOuterObject = movieInfoItr.next()
movieOuterObject = movieInfoItr.next()
  
// movieArray is just the movie array portion of movieList
var  movieArray = movieOuterObject.value.root.movies


// movieids and titles gives ids and titles of movies                
var movieIdsAndTitles = new Array(10);
for (var i = 0; i < 10; i++) {
    movieIdsAndTitles[i] = new Array(2);
}

for (i = 0; i < movieOuterObject.value.root.movies.toObject().length ; i++) {
     movieIdsAndTitles[i][0]= movieArray[i].id;
     movieIdsAndTitles[i][1]= movieArray[i].title;
    }                              
                                
return movieIdsAndTitles;
  
}

exports.rtGetMovieReviews = function rtGetMovieReviews( id ) {

    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",id,"/reviews.json?apikey=",rtapikey);
    var movieReviewItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(250);
  
  
    var movieReview = movieReviewItr.next();
    movieReview = movieReviewItr.next();
    var movieReview = movieReview.value;
    return movieReview;
}

exports.rtGetTopMovieActors = function rtGetTopMovieActors( movieIds ) {
var actorArray = new Array();
  
  for (i = 0; i<movieIds.length; i++) {
  
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",movieIds[i],"/cast.json?apikey=",rtapikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(250);
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieCast = movieInfo.value.toObject().cast;
    
    //for (j=0; j<movieCast.length; j++) {
    for (j=0; j<5; j++) { // just use top 5 actors in a movie
      
      var actor = movieCast[j];
      actor['movieId'] = movieIds[i];
      actorArray.push(actor);
    }
  }
  return actorArray;
}

exports.getTmdbActorInfo = function getTmdbActorInfo(actorName) {

actorName = xdmp.urlEncode(actorName);
var res = xdmp.httpGet("https://api.themoviedb.org/3/search/person?query=" + actorName + "&api_key="+tmdbapikey);
var page = res.next();
page = res.next();
var id = page.value.toObject().results[0].id;
var res2 = xdmp.httpGet("https://api.themoviedb.org/3/person/"+id+"?api_key="+tmdbapikey);
var actor = res2.next();
actor = res2.next().value.toObject();
return actor;
}