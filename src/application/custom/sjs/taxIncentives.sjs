var sem = require("/MarkLogic/semantics.xqy");
var store = sem.rulesetStore("/rules/incentives.rules", sem.store());

var res = sem.sparql(" \n\
PREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \n\
PREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#> \n\
PREFIX dbpedia-owl:	<http://dbpedia.org/ontology/> \n\
PREFIX owl: <http://www.w3.org/2002/07/owl#> \n\
PREFIX wb:	<http://wb.com/props#> \n\
PREFIX si:	<http://si.gov/si:> \n\
 \n\
SELECT ?s ?o \n\
WHERE  \n\
{  \n\
    ?s si:hasTaxIncentives ?o . \n\
    FILTER(regex(?s,'film')) \n\
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
