declareUpdate();

function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}

// This function gets tweets based on a query
// the code can be modified to pass in the query via a form
function twLoadTweetsForTop10Movies (tAndI, accessId) {
  
  var query;
  var myuri;
  var tweetItr;
  var tweetPackage;
  var tweetCount;
  var movieId;
  var aTweet;
  var aTweetObj;
  var docName;
  var date;
  accessId = "Bearer " + accessId;
  
  
  for (i = 0; i < tAndI.length; i++) {
   query = xdmp.urlEncode(tAndI[i][1]);
   movieId = tAndI[i][0];
  
   myuri = fn.concat("https://api.twitter.com/1.1/search/tweets.json?q=",query);
 
 /*  
   tweetItr = xdmp.httpGet(myuri, 
                              { "headers" : {
                                "Authorization" : "Bearer AAAAAAAAAAAAAAAAAAAAACYkeQAAAAAAr%2F1pR0BhZF4yexQfADbDHbOHwdM%3DscxWJTjQ85vF1lj9AK7LXMLXLsmyOXDmV58kRLzOcJ68XCSUTZ"
                                },
                               "format" : "json"
                              });
*/
    tweetItr = xdmp.httpGet(myuri, 
                              { "headers" : {
                                "Authorization" : accessId
                                },
                               "format" : "json"
                              });

   tweetPackage = tweetItr.next();
   tweetPackage = tweetItr.next().value.toObject();
   tweetCount = tweetPackage.search_metadata.count;
    
    for (j=0; j < tweetCount; j++) {

      try {
      aTweet = tweetPackage.statuses[j].text;
      aTweet = xdmp.urlEncode(aTweet);
      
      query = query.replace(/\+/g, " ");
      aTweetObj = aTweet.replace(/\+/g," ");
      aTweetObj = '{ "tweet"' + ':' + '"' + aTweetObj + '"' + ',' + '"movieId"'+ ':' + '"' + movieId + '"' + ',' + '"movieTitle"' + ':' + '"' + query + '"' + '}';
      aTweetObj = cleanString(aTweetObj);
      aTweetObj = JSON.parse(aTweetObj);
      
      date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
      docName = fn.concat("tweet-movie-",movieId,"-",date,"-",j,".json");
      xdmp.documentInsert(docName ,aTweetObj, xdmp.defaultPermissions(),"tweets-movies");
      }
      catch(err) {
        xdmp.log("tweet error");
        continue;
      }
    }
  }
  return "Done inserting tweets for movies";
  //return aTweetObj;
  
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var twLib = require("/application/custom/sjs/twLib.sjs");
var titlesAndIds = rtLib.rtGetTop10MovieIdsAndTitles();
var aId = twLib.twGetAccessToken();
xdmp.setResponseContentType("text/html");
twLoadTweetsForTop10Movies(titlesAndIds,aId);