xquery version "1.0-ml";

module namespace getReviews = "http://marklogic.com/rest-api/resource/getReviews";

import module namespace json="http://marklogic.com/xdmp/json" at "/MarkLogic/json/json.xqy";
import module namespace json-helper="http://marklogic.com/demo-cat/json-helper" at "/lib/json-helper.xqy";
import module namespace getSomeReviews="http://marklogic.com/pocapp/getSomeReviews" at "/application/custom/xquery/getSomeReviews.xqy";

declare namespace roxy = "http://marklogic.com/roxy";
declare namespace jbasic = "http://marklogic.com/xdmp/json/basic";

(: 
 : To add parameters to the functions, specify them in the params annotations. 
 : Example
 :   declare %roxy:params("uri=xs:string", "priority=xs:int") carco:get(...)
 : This means that the get function will take two parameters, a string and an int.
 :)

(:
 :)
declare
%roxy:params("movie=xs:string")
function getReviews:get(
    $context as map:map,
    $params  as map:map
) as document-node()*
{
let $output-types := map:put($context,"output-types","application/json")
let $apikey := "ek43fd5d4pgnkr44m24de9wr"
(:let $movie := map:get($params,'movie') :)
let $movie := xdmp:url-encode(xdmp:get-request-field("movie"))
let $uri :=fn:concat("http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=",$movie,"&amp;apikey=",$apikey,"&amp;page_limit=1")
let $_temp := xdmp:log (fn:concat("The movie variable is ", $movie, " and the uri is ", $uri))

let $review := xdmp:http-get($uri,
    <options xmlns="xdmp:document-get">
       <format>text</format>
     </options>)
let $_temp2 := map:put($params,"review",$review[2])
let $s := "xquery version '1.0-ml';
            declare option xdmp:update 'true';
            declare variable $r external;
            xdmp:document-insert(fn:concat('review-',xdmp:random(10000),'.json'),text {$r},(), 'rottenTomatoesReview')"

return(
  xdmp:eval($s, (xs:QName("r"),$review[2])),
  xdmp:set-response-code(200, "OK"),
  xdmp:log($review[2]),
  document { $review[2]}
 )
 
};

(:
 :)
declare 
%roxy:params("review=xs:string")
function getReviews:put(
    $context as map:map,
    $params  as map:map,
    $input   as document-node()*
) as document-node()?
{
  let $output-types := map:put($context,"output-types","application/json")

return(
  xdmp:set-response-code(200, "OK")
 )
};

(:
 :)
declare 
%roxy:params("")
function getReviews:post(
    $context as map:map,
    $params  as map:map,
    $input   as document-node()*
) as document-node()*
{
  map:put($context, "output-types", "application/xml"),
  xdmp:set-response-code(200, "OK"),
  document { "POST called on the ext service extension" }
};

(:
 :)
declare 
%roxy:params("")
function getReviews:delete(
    $context as map:map,
    $params  as map:map
) as document-node()?
{
  map:put($context, "output-types", "application/xml"),
  xdmp:set-response-code(200, "OK"),
  document { "DELETE called on the ext service extension" }
};
