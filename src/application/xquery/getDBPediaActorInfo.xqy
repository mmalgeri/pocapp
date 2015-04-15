xquery version "1.0-ml";
module namespace pocappLib = "pocappLib";
import module namespace json = "http://marklogic.com/xdmp/json" at "/MarkLogic/json/json.xqy";
import module namespace sem = "http://marklogic.com/semantics" at "/MarkLogic/semantics.xqy";
import module namespace spq = "http://www.w3.org/TR/sparql11-protocol/" at "/application/xquery/lib-spq.xqy"; 
declare namespace sparql = "http://www.w3.org/2005/sparql-results#";
declare namespace dbpprop = "http://dbpedia.org/property/";

declare function pocappLib:getDBPediaActorInfo($term1 as xs:string) as node()*
{

let $sterm1 := fn:replace($term1, " ", "_")

let $query := fn:concat("Select ?s ?p ?o where { BIND (dbpedia:", $sterm1," AS ?s). ?s ?p ?o } LIMIT 100")

let $results := spq:query-post('http://dbpedia.org/sparql', 'http://dbpedia.org', (),$query, $spq:SPARQL_RESULTS_XML)


let $numresults := fn:count($results//result)

let $r := for $res in $results//sparql:result
            return (<triple><subject><value>{$res//sparql:binding[@name="s"]/sparql:uri/text()}</value></subject><predicate><value>{$res//sparql:binding[@name="p"]/sparql:uri/text()}</value></predicate>
            <object><value>{$res//sparql:binding[@name="o"]/sparql:uri/text()}</value></object></triple>)
            
            
let $c := json:config("custom")
let $x := map:put($c,"whitespace", "ignore")
let $j := json:transform-to-json($r, $c)
                                
return $j
};


