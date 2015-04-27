declareUpdate();
var rtLib = require("/application/custom/sjs/rtLib.sjs");

// Adds the date the movie was in Top 10 and its rank at that time
function addRankInfo( aMovie, rank, id) {
  
  aMovie['dateInTop'] = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
  aMovie['rank'] = rank;
  aMovie['movieId'] = id;
  aMovie['modeFlag'] = 'movieMode';
  return aMovie;
}

function addRtTriples (dataIn) {
  
  var id = dataIn.movieId;
  var synopsis = dataIn.synopsis;
  var movieName = dataIn.title;
  var rating = mpaa_rating = dataIn.mpaa_rating;
  var release = dataIn.release_dates.theater;
  var cast = dataIn.abridged_cast;
  var revs = rtLib.rtGetMovieReviews(id).toObject();
  
  var tripleArray = new Array();
  var triple = sem.triple(sem.iri(movieName), sem.iri("hasRating"), rating);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("http://www.w3.org/2000/01/rdf-schema#label"), movieName);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("hasReleaseDate"), release);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("hasId"), id);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("hasSynopsis"), synopsis);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), sem.iri("http://dbpedia.org/ontology/Film"));
  tripleArray.push(triple);
  for (j = 0; j < 5; j++) {
    try {
    triple = sem.triple(sem.iri(movieName), sem.iri("hasReview"), revs.reviews[j].links.review);
    tripleArray.push(triple);
    }
    catch(err){
        xdmp.log ("error in adding info and triples to movies " + err);
        continue;
      }
  }
  for (k = 0; k < cast.length; k++) {
    try {
    triple = sem.triple(sem.iri(movieName), sem.iri("hasCastMember"), cast[k].name);
    tripleArray.push(triple);
    }
    catch(err){
        xdmp.log ("error in adding cast info and triples to movie" + err);
        continue;
      }
  }
  dataIn.rtTriples = tripleArray;

  return dataIn;

}

function addDbpediaTriples (dataWithRtTriplesIn, name) {
  
  var getDBPedia = require("/application/xquery/getDBPediaMovieInfo.xqy");
  var dbTriples = getDBPedia.getDBPediaMovieInfo (name);
  dataWithRtTriplesIn.dbpTriples = dbTriples;
  return dataWithRtTriplesIn;
  
}


// Inserts each movie into DB after adding the rank 
// and triple info form rotten tomatoes and DBPedia
function rtLoadTop10MoviesWithTriples(movieArray) {
  
  xdmp.log("Got top 10 movie array");
  movieArray = movieArray.toObject();
  for (i = 0; i < 10 ; i++){
    
    try {
    var movie = movieArray[i];
    var movieId = movie.id;
    var date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
    var docName = fn.concat('Movie__Info-',i+1,'-',date,'-',movieId,'.json');
    
    var movieName = movie.title;
    
    var data = addRankInfo(movie,i+1, movieId);
    var dataWithRtTriples = addRtTriples(data);
    
    try {
    var dataWithRtTriplesAndDbpediaTriples = addDbpediaTriples(dataWithRtTriples, movieName);
    }
    catch(err){
        xdmp.log ("Not inserting DBPedia Triples for this movie" + err);
        xdmp.documentInsert(docName ,dataWithRtTriples,null,"top10");
        continue;
      }

    xdmp.log("inserting movies with triples");
    
    xdmp.documentInsert(docName ,dataWithRtTriplesAndDbpediaTriples,null,"top10");
    }
    catch(err){
        xdmp.log ("error in processing movies " + err);
        continue;
      }
  }  
}

var topTen = rtLib.rtGetTop10Movies();
rtLoadTop10MoviesWithTriples(topTen);