declareUpdate();
var rtLib = require("/application/custom/sjs/rtLib.sjs");

// This function adds the date the movie was in Top 10 and its rank at that time
function addRankInfo( aMovie, rank, id) {
  
  aMovie['dateInTop'] = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
  aMovie['rank'] = rank;
  aMovie['movieId'] = id;
  return aMovie;
}

function addTriples (dataIn) {
  
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

function addDBPediaInfo (dataWithRtTriplesIn) {
  
  var getDBPedia = require("/application/xquery/getDBPediaInfo.xqy");
  var dbTriples = getDBPedia["getInfo"]();
  dataWithRtTriplesIn.dbpTriples = dbTriples;
  return dataWithRtTriplesIn;
  
}


//This function inserts each movie into DB after adding the rank and date info
function rtLoadTop10MoviesWithTriples(movieArray) {
  
  movieArray = movieArray.toObject();
  for (i = 0; i < 10 ; i++){
       
    var movie = movieArray[i];
    var movieId = movie.id;
    var date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
    var docName = fn.concat('movie-',i+1,'-',date,'-',movieId,'.json');
    
    var data = addRankInfo(movie,i+1, movieId);
    var dataWithRtTriples = addTriples(data);
    
    //var dataWithRtTriplesAndDBPediaInfo = addDBPediaInfo(dataWithRtTriples);
    //return dataWithRtTriplesAndDBPediaInfo;
    //return dataWithRtTriples;
    
      
    
    xdmp.documentInsert(docName ,dataWithRtTriples, xdmp.defaultPermissions(),"top10");
  }
  
}

var topTen = rtLib.rtGetTop10Movies();
rtLoadTop10MoviesWithTriples(topTen);

xdmp.setResponseContentType("text/html");
"<HTML>Done loading top 10 movies with triples</HTML>"