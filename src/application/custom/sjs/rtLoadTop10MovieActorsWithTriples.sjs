declareUpdate();

function addIdInfo( aActor, id, movie) {
  
  
  aActor['movieId'] = id;
  aActor['actorId'] = aActor.id;
  aActor['movieTitle'] = movie.title;
  aActor['actorName'] = aActor.name;
  return aActor;
}

function addRtTriples (aActor, id, movie) {
  
  var id = aActor.actorId;
  var actorName = aActor.name;

  var movieName = movie.title;
  var cast = movie.abridged_cast;
  cast = cast.toObject();
  
  var tripleArray = new Array();
  var triple = sem.triple(sem.iri(actorName), sem.iri("hasId"), id);
  tripleArray.push(triple);
  var triple = sem.triple(sem.iri(actorName), sem.iri("http://www.w3.org/2000/01/rdf-schema#label"), actorName);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(actorName), sem.iri("appearedIn"), movieName);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(actorName), sem.iri("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), sem.iri("http://dbpedia.org/ontology/Actor"));
  tripleArray.push(triple);
  
  for (k = 0; k < cast.length; k++) {
    try {
    triple = sem.triple(sem.iri(actorName), sem.iri("appearedWith"), cast[k].name);
    tripleArray.push(triple);
    }
    catch(err){
        xdmp.log ("error in adding info and triples to actors " + err);
        continue;
      }
  }
  aActor.rtTriples = tripleArray;

  return aActor;

}

function addDbpediaTriples (actorWithRtTriples) {
  
  var getDBPedia = require("/application/xquery/getDBPediaActorInfo.xqy");
  var actorName = actorWithRtTriples.name;
  var dBPTriples = getDBPedia.getDBPediaActorInfo(actorName);

  var actorWithRtAndDBPTriples = actorWithRtTriples;
  actorWithRtAndDBPTriples.dbpTriples = dBPTriples;
  return actorWithRtAndDBPTriples;
  
}

function addTheMovieDbTriples (anActor){
  var rtLib = require("/application/custom/sjs/rtLib.sjs");
  var actorName = anActor.name; 
  var actorStuff = rtLib.getTmdbActorInfo(actorName);
  var tmdbActorbio = actorStuff.biography;
  var tmdbActorImdb = actorStuff.imdb_id;
  var tmdbActorImdbUrl = "http://www.imdb.com/name/"+tmdbActorImdb;

  //create triples from Tmdb;
  var tmdbTripleArray = new Array();
  var tmdbTriple = sem.triple(sem.iri(actorName), sem.iri("hasBio"), tmdbActorbio);
  tmdbTripleArray.push(tmdbTriple);
  tmdbTriple = sem.triple(sem.iri(actorName), sem.iri("hasImdbId"), tmdbActorImdb);
  tmdbTripleArray.push(tmdbTriple);
  tmdbTriple = sem.triple(sem.iri(actorName), sem.iri("hasImdbIdUrl"), tmdbActorImdbUrl);
  tmdbTripleArray.push(tmdbTriple);

  http://www.imdb.com/name/nm1663205
  
  anActor.tmdbTriples = tmdbTripleArray;
  return anActor;

}

function rtLoadTopMovieActorsWithTriples( ids, movies ) {
var apikey = "ek43fd5d4pgnkr44m24de9wr";

  for (i=0; i<10; i++) {
    var uri = fn.concat("http://api.rottentomatoes.com/api/public/v1.0/movies/",ids[i],"/cast.json?apikey=",apikey);
    var movieInfoItr = xdmp.httpGet(uri, {format:'json'});
    xdmp.sleep(205);
  
    var movieInfo = movieInfoItr.next();
    movieInfo = movieInfoItr.next();
    var movieCast = movieInfo.value.toObject().cast;
    
    for (j=0; j<movieCast.length; j++) {
      try {
      var actor = movieCast[j];
      actor = addIdInfo(actor, ids[i],movies[i]);
      actor = addRtTriples(actor, ids[i],movies[i]);
      actor = addTheMovieDbTriples(actor);
      actor = addDbpediaTriples(actor);
      }
      catch(err){
        xdmp.log ("error in adding info and triples " + err);
        var docName = fn.concat('actors-',actor.id,'-',ids[i],'.json');
        xdmp.documentInsert(docName ,actor, null,"actor");
        continue;
      }
      
      var docName = fn.concat('actors-',actor.id,'-',ids[i],'.json');
      xdmp.documentInsert(docName ,actor, null,"actor");
    }
  }
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var topTenIds = rtLib.rtGetTop10MovieIds();
var topTenMovies = rtLib.rtGetTop10Movies();
rtLoadTopMovieActorsWithTriples(topTenIds, topTenMovies);