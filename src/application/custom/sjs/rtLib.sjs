// rtGetTop10MovieIds returns an array containing the ids of the top 10 movies
// The function is called at the end to demonstrate what it does

exports.rtGetTop10MovieIds = function rtGetTop10MovieIds () {
var apikey = "ek43fd5d4pgnkr44m24de9wr";

var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=",apikey)
var movieInfoItr = xdmp.httpGet(uri, {format:'json'})
    

// Need to move movieItr twice to get to movielist
// movieList is a JSON object that includes the "done" key and the "value" key. 
// The value key has a value of "movies", which is an array of the 10 movies==
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
var apikey = "ek43fd5d4pgnkr44m24de9wr";

var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=",apikey);
var movieInfoItr = xdmp.httpGet(uri, {format:'json'});

// Need to move movieItr twice to get to movielist
// movieList is a JSON object that includes the "done" key and the "value" key. 
// The value key has a value of "movies", which is an array of the 10 movies==
var movieOuterObject = movieInfoItr.next();
movieOuterObject = movieInfoItr.next();

  
// movieArray is just the movie array portion of movieList
var  movieArray = movieOuterObject.value.root.movies;
                          
                                
return movieArray;
}

exports.rtGetMovieActors = function rtGetMovieActors( id ) {
var apikey = "ek43fd5d4pgnkr44m24de9wr";
var actorArray = new Array();

  
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",id,"/cast.json?apikey=",apikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieCast = movieInfo.value.toObject().cast;
    
    for (j=0; j<movieCast.length; j++) {
      
      var actor = movieCast[j];
      actorArray.push(actor);
    }
  return actorArray;
}

// rtGetTop10MovieIdsAndTitles returns array of the ids of the top 10 movies and Titles
// The function is called at the end to demonstrate what it does

exports.rtGetTop10MovieIdsAndTitles = function rtGetTop10MovieIdsAndTitles () {
var apikey = "ek43fd5d4pgnkr44m24de9wr";

var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=",apikey)
var movieInfoItr = xdmp.httpGet(uri, {format:'json'})
xdmp.sleep(200);
    

// Need to move movieItr twice to get to movielist
// movieList is a JSON object that includes the "done" key and the "value" key. 
// The value key has a value of "movies", which is an array of the 10 movies==
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
var apikey = "ek43fd5d4pgnkr44m24de9wr";

    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",id,"/reviews.json?apikey=",apikey);
    var movieReviewItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(200);
  
  
    var movieReview = movieReviewItr.next();
    movieReview = movieReviewItr.next();
    var movieReview = movieReview.value;
    return movieReview;
}


