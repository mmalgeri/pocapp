declareUpdate();

function addIdInfo( aActor, id, movie) {
  
  
  aActor['movieId'] = id;
  aActor['actorId'] = aActor.id;
  aActor['movieTitle'] = movie.title;
  return aActor;
}

function rtInsertTopMovieActors( ids, movies ) {
var apikey = "ek43fd5d4pgnkr44m24de9wr";

  for (i=0; i<10; i++) {
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",ids[i],"/cast.json?apikey=",apikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(200);
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieCast = movieInfo.value.toObject().cast;
    
    for (j=0; j<movieCast.length; j++) {
      
      var actor = movieCast[j];
      actor = addIdInfo(actor, ids[i],movies[i]);
      
      var docName = fn.concat('actor-',actor.id,'-',ids[i],'.json');
      //return actor;
      xdmp.documentInsert(docName ,actor, xdmp.defaultPermissions(),"actor");
    }
  }
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var topTenIds = rtLib.rtGetTop10MovieIds();
var topTenMovies = rtLib.rtGetTop10Movies();
rtInsertTopMovieActors(topTenIds, topTenMovies);

xdmp.setResponseContentType("text/html");
"<HTML>Done loading top 10 movie actors</HTML>"