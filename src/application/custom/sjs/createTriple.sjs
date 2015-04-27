declareUpdate();

var home = 'http://localhost:9070/index.html';
var subject = fn.replace (xdmp.getRequestField("subject"), ' ', '_');
var predicate = xdmp.getRequestField("predicate");
var object = xdmp.getRequestField("object");
var date = fn.formatDateTime(fn.currentDateTime(),"[Y0001]-[M01]-[D01]-[H01]-[M01]");

//create triples from web form;
xdmp.log("Got triple info and inserting subject = " + subject + " predicate = " + predicate + " object = " + object);
  var tripleArray = new Array();
  var aTriple = sem.triple(sem.iri("http://dbpedia.org/resource/" + subject), sem.iri("http://www.w3.org/1999/02/22-rdf-syntax-ns#" + predicate), sem.iri("http://dbpedia.org/ontology/" + object));
  tripleArray.push(aTriple);

  var docName = fn.concat('adHocTriple-',date,'.json');
  xdmp.documentInsert(docName ,tripleArray, null,"adHocTriple");
  xdmp.redirectResponse(home);
