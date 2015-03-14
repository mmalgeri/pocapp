declareUpdate();
var rtLib = require("/application/custom/sjs/rtLib.sjs");

// Adds the date the movie was in Top 10 and its rank at that time
function addRankInfo( aMovie, rank, id) {
  
  aMovie['dateInTop'] = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
  aMovie['rank'] = rank;
  aMovie['movieId'] = id;
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
  triple = sem.triple(sem.iri(movieName), sem.iri("hasReleaseDate"), release);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("hasId"), id);
  tripleArray.push(triple);
  triple = sem.triple(sem.iri(movieName), sem.iri("hasSynopsis"), synopsis);
  tripleArray.push(triple);
  for (j = 0; j < 5; j++) {
    triple = sem.triple(sem.iri(movieName), sem.iri("hasReview"), revs.reviews[j].links.review);
    tripleArray.push(triple);
  }
  for (k = 0; k < cast.length; k++) {
    triple = sem.triple(sem.iri(movieName), sem.iri("hasCastMember"), cast[k].name);
    tripleArray.push(triple);
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
  
  movieArray = movieArray.toObject();
  for (i = 0; i < 10 ; i++){
       
    var movie = movieArray[i];
    var movieId = movie.id;
    var date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
    var docName = fn.concat('movie-',i+1,'-',date,'-',movieId,'.json');
    
    var movieName = movie.title;
    
    var data = addRankInfo(movie,i+1, movieId);
    var dataWithRtTriples = addRtTriples(data);
    
    var dataWithRtTriplesAndDbpediaTriples = addDbpediaTriples(dataWithRtTriples, movieName);

    xdmp.log("inserting movies with triples");
    
    xdmp.documentInsert(docName ,dataWithRtTriplesAndDbpediaTriples,null,"top10");
  }  
}

var topTen = rtLib.rtGetTop10Movies();
rtLoadTop10MoviesWithTriples(topTen);