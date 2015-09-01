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

function addIdInfo( aActor, id) {
  
  
  aActor['movieId'] = id;
  aActor['actorId'] = aActor.id;
  aActor['modeFlag'] = 'actorTweetMode';
  return aActor;
}

// This function gets tweets based on a query
// the code can be modified to pass in the query via a form
function twLoadTweetsForTop10Actors (aArray, accessId) {
  
  var query;
  var myuri;
  var tweetItr;
  var tweetPackage;
  var tweetCount;
  var actorId;
  var aTweet;
  var aTweeter;
  var docName;
  var date;
  accessId = "Bearer " + accessId;
  
  for (i = 0; i < aArray.length; i++) {
   query = xdmp.urlEncode(aArray[i].name);
   actorId = aArray[i].id;
  
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

    xdmp.sleep(100);
    
   tweetPackage = tweetItr.next();
   tweetPackage = tweetItr.next().value.toObject();
   tweetCount = tweetPackage.search_metadata.count;
    
     

    for (j=0; j < tweetCount; j++) {

      try {
      aTweet = tweetPackage.statuses[j].text;
      aTweet = xdmp.urlEncode(aTweet);
      aTweeter = tweetPackage.statuses[j].user.screen_name;
      
      query = query.replace(/\+/g, " ");
      aTweet = aTweet.replace(/\+/g, " ");
      aTweeter = aTweeter.replace(/\+/g, " ");
      aTweet = '{ "tweet"' + ':' + '"' + aTweet + '"' + ',' + '"actorId"'+ ':' + '"' + actorId + '"' + ',' + '"actorName"' + ':' + '"' + query + '"' + ',' + '"tweeter"'+ ':' + '"' + aTweeter + '"' + '}';
      aTweet = cleanString(aTweet);
      aTweet = JSON.parse(aTweet);
      aTweet.modeFlag = 'actorTweetMode';
      
      date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]");
      docName = fn.concat("Actor_Tweet-",actorId,"-",date,"-",j,".json");
      xdmp.documentInsert(docName ,aTweet, null,"tweets-actors");
      }
      catch(err){
        xdmp.log ("error in tweet");
        continue;
      }
    }
  }
  return "Done inserting tweets for top actors";
}

var rtLib = require("/application/custom/sjs/rtLib.sjs");
var twLib = require("/application/custom/sjs/twLib.sjs");
var movieIds = rtLib.rtGetTop10MovieIds();
var actorsAndIds = rtLib.rtGetTopMovieActors(movieIds);
var aId = twLib.twGetAccessToken();
twLoadTweetsForTop10Actors(actorsAndIds, aId);