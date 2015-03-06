declareUpdate();

function addIdInfo( aActor, id, movie) {
  
  
  aActor['movieId'] = id;
  aActor['actorId'] = aActor.id;
  aActor['movieTitle'] = movie.title;
  return aActor;
}

function addTriples (aActor, id, movie) {
  
  var id = aActor.actorId;
  var actorName = aActor.name;
  var movieName = movie.title;
  var cast = movie.abridged_cast;
  cast = cast.toObject();
  
  var tripleArray = new Array();
  var triple = sem.triple(sem.iri(actorName), sem.iri("hasId"), id);
  tripleArray.push(triple);
  var triple = sem.triple(sem.iri(actorName), sem.iri("appearedIn"), movieName);
  tripleArray.push(triple);
  xdmp.log("Cast is " + cast);
  
  for (k = 0; k < cast.length; k++) {
    xdmp.log("Array length is " + cast.length);
    triple = sem.triple(sem.iri(actorName), sem.iri("appearedWith"), cast[k].name);
    tripleArray.push(triple);
  }
  aActor.rtTriples = tripleArray;

  return aActor;

}

function addDBPediaInfo (dataWithRtTriplesIn) {
  
  var getDBPedia = require("/application/xquery/getDBPediaInfo.xqy");
  var dbTriples = getDBPedia["getInfo"]();
  dataWithRtTriplesIn.dbpTriples = dbTriples;
  return dataWithRtTriplesIn;
  
}

function rtLoadTopMovieActorsWithTriples( ids, movies ) {
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
      actor = addTriples(actor, ids[i],movies[i]);
      
      var docName = fn.concat('actors-',actor.id,'-',ids[i],'.json');
      //return actor;
      xdmp.documentInsert(docName ,actor, xdmp.defaultPermissions(),"actor");
    }
  }
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var topTenIds = rtLib.rtGetTop10MovieIds();
var topTenMovies = rtLib.rtGetTop10Movies();
rtLoadTopMovieActorsWithTriples(topTenIds, topTenMovies);

xdmp.setResponseContentType("text/html");
"<HTML>Done loading top 10 movie actors</HTML>"