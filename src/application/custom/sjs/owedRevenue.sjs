var sem = require("/MarkLogic/semantics.xqy");
var store = sem.rulesetStore("rdfs.rules", sem.store());

var res = sem.sparql(" \n\
PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \n\
PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#> \n\
PREFIX dbpedia-owl:	<http://dbpedia.org/ontology/> \n\
PREFIX owl: <http://www.w3.org/2002/07/owl#> \n\
PREFIX wb:	<http://wb.com/props#> \n\
 \n\
SELECT ?s ?p ?o \n\
WHERE  \n\
{  \n\
    ?s wb:owedRevenueFrom ?o . \n\
    BIND (wb:owedRevenueFrom AS ?p) \n\
} \n\
",[],[],store);

var resArray = res.toArray();
var resStr = res.toString();

xdmp.log(resStr);
xdmp.setResponseContentType("text/html");
//var result = new NodeBuilder();
//result.addElement("HTML",String(resStr),"http://www.w3.org/1999/xhtml");
//result.toNode();
resArray;

