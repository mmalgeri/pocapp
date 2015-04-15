
var test = xdmp.getRequestField("test");

if (test == "movieids"){
var movieIds = require("/application/custom/sjs/rtLib.sjs");
movieIds.rtGetTop10MovieIds();
}
else if (test == "movies") {
var movies = require("/application/custom/sjs/rtLib.sjs");
movies.rtGetTop10Movies();
}
else if (test == "actorstrips") {
var actor = require("/application/xquery/getDBPediaActorInfo.xqy");
actor.getDBPediaActorInfo("Val Kilmer");
}
else if (test == "movietrips") {
var movietrips = require("/application/xquery/getDBPediaMovieInfo.xqy");
movietrips.getDBPediaMovieInfo("The Princess Bride");
}
else {
	var message = "Test is not found";
	message;
}


