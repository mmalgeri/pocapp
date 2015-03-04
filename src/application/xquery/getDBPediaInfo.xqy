xquery version "1.0-ml";
module namespace pocappLib = "pocappLib";
import module namespace json = "http://marklogic.com/xdmp/json" at "/MarkLogic/json/json.xqy";
import module namespace sem = "http://marklogic.com/semantics" at "/MarkLogic/semantics.xqy";
import module namespace spq = "http://www.w3.org/TR/sparql11-protocol/" at "/application/xquery/lib-spq.xqy"; 
declare namespace sparql = "http://www.w3.org/2005/sparql-results#";
declare namespace dbpprop = "http://dbpedia.org/property/";

declare function pocappLib:getInfo()
{

let $searchTerm := "The_Princess_Bride"

let $query := fn:concat("SELECT * 
WHERE
{
   dbpedia:", $searchTerm, " ?p ?o .
  
}")

let $stuff := spq:query('http://dbpedia.org/sparql', 'http://dbpedia.org', (),$query)
let $morestuff := $stuff

return $morestuff//sparql:result
};


