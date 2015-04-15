// This function implements the twitter auth method for applications described here
// https://dev.twitter.com/oauth/application-only
// requires the user to create a sample app at twitter
// and get a ConsumerKey and a Consumer Secret Key
// The keys are urlEncoded to future proof the code, should the format change
// The consumerKey and the consumerKeyPrivate could be passed in via a form
// The ouput of this call is used in  other modules that call
// out to Twitter. It is used in the httpGet call in the Authorization header

exports.twGetAccessToken = function twGetAccessToken () {
  
var consumerKey = "ABF833iUIPPJlQPxV1esHvszg";
var consumerKeyPrivate = "BjFpDFXPktSfVuuxZygIPuYt1yw4rCNdEJfd7QxXG9hsFpIenk"

var consumerKeyEncoded = xdmp.urlEncode(consumerKey);
var consumerKeyPrivateEncoded = xdmp.urlEncode(consumerKeyPrivate);
var preAccessToken = xdmp.base64Encode(fn.concat(consumerKeyEncoded,":",consumerKeyPrivateEncoded));


preAccessToken = fn.concat("Basic ", preAccessToken);

// This code uses the preAccessToken to get the actual access token, which is used in API calls
var authKeyItr = xdmp.httpPost("https://api.twitter.com/oauth2/token",
                            { 
                             "headers" : {
                                "Authorization" : preAccessToken,
                                "Content-type"  : "application/x-www-form-urlencoded;charset=UTF-8"
                                },
                              "data": "grant_type=client_credentials"
                              }
                            );

var accessToken = authKeyItr.next();
accessToken = authKeyItr.next().value.toObject().access_token;
return accessToken;
}