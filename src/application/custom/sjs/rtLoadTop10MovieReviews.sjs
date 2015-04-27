declareUpdate();

function addIdInfo( aReview, id, movie) {
  
  aReview = aReview.toObject();
  aReview['id'] = id;
  aReview['movieId'] = id;
  aReview['movieTitle'] = movie.title;
  aReview['modeFlag'] = 'reviewMode';
  return aReview;
}

function rtInsertTopMovieReviews( ids, movies ) {
var apikey = "ek43fd5d4pgnkr44m24de9wr";
  
  for (i=0; i<10; i++) {
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",ids[i],"/reviews.json?apikey=",apikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(205);
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieReviews = movieInfo.value;
    
    movieReviews = addIdInfo(movieReviews, ids[i], movies[i]);
    
    var docName = fn.concat('MovieReview-',ids[i],'.json');
    
    xdmp.documentInsert(docName ,movieReviews, null,"review");
  }
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var topTenIds = rtLib.rtGetTop10MovieIds();
var topTenMovies = rtLib.rtGetTop10Movies();
rtInsertTopMovieReviews(topTenIds, topTenMovies);