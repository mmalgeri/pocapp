declareUpdate();
// This function adds the date the movie was in Top 10 and its rank at that time
function addRankInfo( aMovie, rank, id) {
  
  aMovie['dateInTop'] = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
  aMovie['rank'] = rank;
  aMovie['movieId'] = id;
  return aMovie;
}

//This function inserts each movie into DB after adding the rank and date info
function rtLoadTop10Movies(movieArray) {

  
  movieArray = movieArray.toObject();
  for (i = 0; i < 10 ; i++){
       
    var movie = movieArray[i];
    var movieId = movie.id;
    var date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
    var docName = fn.concat('movie-',i+1,'-',date,'-',movieId,'.json');
    
    var data = addRankInfo(movie,i+1, movieId);
    
    
    xdmp.documentInsert(docName ,data, xdmp.defaultPermissions(),"top10");
  }
  
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var topTen = rtLib.rtGetTop10Movies();
rtLoadTop10Movies(topTen);

xdmp.setResponseContentType("text/html");
"<HTML>Done loading top 10 movies</HTML>"