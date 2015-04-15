// This function gets tweets based on a query
// The code can be modified to pass in the query via a form
// Prior to running this module, the user should have run twAuthenticate to get
// an access token, which is used in the httpGet call, in the Authorization header
function getTweets () {
  
  var query = xdmp.urlEncode("American Sniper");
  
  var myuri = fn.concat("https://api.twitter.com/1.1/search/tweets.json?q=",query);
 
   
  var tweetItr = xdmp.httpGet(myuri, 
                              { "headers" : {
                                "Authorization" : "Bearer AAAAAAAAAAAAAAAAAAAAACYkeQAAAAAAr%2F1pR0BhZF4yexQfADbDHbOHwdM%3DscxWJTjQ85vF1lj9AK7LXMLXLsmyOXDmV58kRLzOcJ68XCSUTZ"
                                },
                               "format" : "json"
                              });
var tweetPackage = tweetItr.next();
tweetPackage = tweetItr.next().value.toObject();

return tweetPackage.statuses[3].text;
}

getTweets();