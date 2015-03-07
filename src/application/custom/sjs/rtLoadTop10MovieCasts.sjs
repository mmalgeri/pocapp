declareUpdate();

function addIdInfo( aCast, id, movie) {
  
  aCast = aCast.toObject();
  aCast['movieId'] = id;
  aCast['movieTitle'] = movie.title;
  return aCast;
}

function rtInsertTopMovieCasts( ids, movies ) {
var apikey = "ek43fd5d4pgnkr44m24de9wr";

  for (i=0; i<10; i++) {
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",ids[i],"/cast.json?apikey=",apikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(250);
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieCast = movieInfo.value;
    
    movieCast = addIdInfo(movieCast, ids[i], movies[i]);
    
    var docName = fn.concat('movie-cast-',ids[i],'.json');
    
    
    xdmp.documentInsert(docName ,movieCast, xdmp.defaultPermissions(),"cast");


  }
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var topTenIds = rtLib.rtGetTop10MovieIds();
var topTenMovies = rtLib.rtGetTop10Movies();
rtInsertTopMovieCasts(topTenIds, topTenMovies);

xdmp.setResponseContentType("text/html");
"<HTML>Done loading cast members</HTML>"