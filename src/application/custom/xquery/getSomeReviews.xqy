xquery version "1.0-ml";

module namespace getSomeReviews = "http://marklogic.com/pocapp/getSomeReviews";

declare namespace html = "http://www.w3.org/1999/xhtml";

declare function getSomeReviews:getSomeReview($test as xs:string)
{

	let $apikey := "mkw79yvmqtr2fj4tkg5m76fm"
	let $movie := $test
	let $uri :=fn:concat("http://api.rottentomatoes.com/api/public/v1.0/movies/770672122.json?q=",$movie,"&amp;apikey=",$apikey,"&amp;page_limit=1")
        let $message := xdmp:log(fn:concat("about to call rotten tomatoes with ", $uri))


	let $review := xdmp:http-get($uri,
            <options xmlns="xdmp:document-get">
                <format>text</format>
            </options>)

	let $home := "http://localhost:9070/index.html"

   return (
   	(:xdmp:document-insert(fn:concat("review-",xdmp:random(10000),".json"),$review[2],(), "rottenTomatoesReview"),:)
   	xdmp:log("hello bruce")
   	)

};
