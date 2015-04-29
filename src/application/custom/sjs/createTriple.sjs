declareUpdate();

var home = 'http://localhost:9070/index.html';
var subject = fn.replace (xdmp.getRequestField("subject"), ' ', '_');
var predicate = xdmp.getRequestField("predicate");
var object = fn.replace(xdmp.getRequestField("object"), ' ', '_');

//create triples from web form;
xdmp.log("Got triple info and inserting subject = " + subject + " predicate = " + predicate + " object = " + object);
  var tripleArray = new Array();
  var aTriple = sem.triple(sem.iri("http://dbpedia.org/resource/" + subject), sem.iri("http://wb.com/props#" + predicate), sem.iri("http://dbpedia.org/ontology/" + object));
  var ahoc = {'modeFlag': 'adHocMode'};
  tripleArray.push(aTriple);
  ahoc.ahocTriples = tripleArray;
  ahoc.actorName=subject;
  var randNum = xdmp.random(100000);
  var docName = fn.concat('adHocTriple-',randNum,'.json');
  xdmp.documentInsert(docName ,ahoc, null,"adHocTriple");
  xdmp.redirectResponse(home);
