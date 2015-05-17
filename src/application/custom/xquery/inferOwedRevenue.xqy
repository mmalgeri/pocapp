xquery version "1.0-ml";

declare namespace inferOwedRevenue = "http://marklogic.com/pocapp/inferOwedRevenue";


(:
## This SPARQL query demonstrates how subPropertyOf inferencing works.
## In this case, hasRightsTo is a subProperty of owedRevenueFrom 
:)

let $rdfs-store := sem:ruleset-store("rdfs.rules",sem:store() )

let $res := 
  (: use the store you just created - pass it into sem:sparql() :)
  sem:sparql('
PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbpedia-owl:	<http://dbpedia.org/ontology/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX wb:	<http://wb.com/props#>

SELECT *
WHERE 
  { 
    ?s wb:owedRevenueFrom ?o .
  }
  ',
  (),
  (),
  $rdfs-store
  )

  return $res
  
