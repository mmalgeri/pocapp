xquery version "1.0-ml";
declare namespace html = "http://www.w3.org/1999/xhtml";

let $postBody := xdmp:get-request-body()
let $topic := xdmp:get-request-field("topic")
let $sentiment := xdmp:get-request-field("sentiment")
let $posOrNeg := xdmp:get-request-field("posOrNeg")

let $home := "http://localhost:9070/index.html"


(:return (xdmp:log($postBody), xdmp:log($sentiment),xdmp:log($topic),xdmp:log($posOrNeg)) :)

 
let $uri :=fn:concat("https://twitter.com/search?q=",$topic,"%20",$sentiment,"&amp;src=type")

let $dirty-tweets := xdmp:http-get($uri)[2]
let $clean-tweets := <html:tweets>{xdmp:tidy($dirty-tweets)//html:p[@class = "js-tweet-text"]}</html:tweets>


let $highlight := if ($posOrNeg eq "positive") then 
			cts:highlight(cts:highlight($clean-tweets, $topic, <Topic>{$cts:text}</Topic>), $sentiment, <posSentiment>{$cts:text}</posSentiment>)
		else
			cts:highlight(cts:highlight($clean-tweets, $topic, <Topic>{$cts:text}</Topic>), $sentiment, <negSentiment>{$cts:text}</negSentiment>)

for $doc at $idx in $highlight/html:p
   return
(
   xdmp:log($sentiment),xdmp:log($topic),xdmp:log($posOrNeg),
   xdmp:document-insert(fn:concat("tweet-", $idx, "-", $topic, "-", $sentiment,".xml"),$doc,(), "tweetsSentiments"),
   xdmp:redirect-response($home)
)
