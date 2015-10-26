declareUpdate();
var sem = require("/MarkLogic/semantics.xqy");

var home = 'http://localhost:9070/index.html';
var subject = fn.replace (xdmp.getRequestField("subject"), ' ', '_');
var predicate = xdmp.getRequestField("predicate");
var object = fn.replace(xdmp.getRequestField("object"), ' ', '_');


// Insert a triple into default graph . 

if ((predicate.indexOf("TaxIncentive") > -1) || (predicate.indexOf("Program") > -1) || (predicate.indexOf("LifeStyleProgram") > -1) )
{

  if (predicate.indexOf("TaxIncentive") > -1) {
    //In next 2 lines finance guy will enter say "Arizona" (no quotes) in subject and "Tax Incentives" for object
    var subTax = "http://dbpedia.org/ontology/" + fn.replace (xdmp.getRequestField("subject"), ' ', '');
    var objTax =  fn.replace(xdmp.getRequestField("subject"), ' ', '_') + "_" + fn.replace(xdmp.getRequestField("object"), ' ', '_');
    var params = {"subject": sem.iri(subTax), "predicate": sem.iri("http://si.gov/si:hasTaxIncentives"), "object": objTax};

  }
  else if (predicate.indexOf("hasBrandProgram") > -1){
    //In next 2 lines finance guy will enter say "Starbucks"(no quotes) in subject and "Partner Program" for object
    var subBrand = "http://corp.com/corp:" + fn.replace (xdmp.getRequestField("subject"), ' ', '');
    var objBrand = fn.replace(xdmp.getRequestField("subject"), ' ', '_') + "_" + fn.replace(xdmp.getRequestField("object"), ' ', '_');
    var params = {"subject": sem.iri(subBrand), "predicate": sem.iri("http://corp.com/partner:hasBrandProgram"), "object": objBrand};
  }
  else if (predicate.indexOf("hasLifeStyleProgram") > -1){
    //In next 2 lines finance guy will enter say "Starbucks"(no quotes) in subject and "SportsLifeStyle Program" for object
    var subLifeStyle = "http://corp.com/corp:" + fn.replace (xdmp.getRequestField("subject"), ' ', '');
    var objLifeStyle = fn.replace(xdmp.getRequestField("subject"), ' ', '_') + "_" + fn.replace(xdmp.getRequestField("object"), ' ', '_');
    var params = {"subject": sem.iri(subLifeStyle), "predicate": sem.iri("http://corp.com/partner:hasLifeStyleProgram"), "object": objLifeStyle};
  }
  else if (predicate.indexOf("hasContributorProgram") > -1) {
    //In next 2 lines finance guy will enter say "The Martian"(no quotes) in subject and "Contributor Program" for object
    var subContributor = "http://corp.com/corp:" + fn.replace (xdmp.getRequestField("subject"), ' ', '');
    var objContributor = fn.replace(xdmp.getRequestField("subject"), ' ', '_') + "_" + fn.replace(xdmp.getRequestField("object"), ' ', '_');
    var params = {"subject": sem.iri(subContributor), "predicate": sem.iri("http://corp.com/corp:hasContributorProgram"), "object": objContributor};
  }
  else
    var params = {"subject": sem.iri("NOT FOUND"), "predicate": sem.iri("NOT FOUND"), "object": "NOT FOUND"};
xdmp.log("Performing SPARQL Update" + "sub= " + params.subject + "pred= " + params.predicate + "obj= " + params.object);


sem.sparqlUpdate('\n\
INSERT DATA\n\
{\n\
   ?subject ?predicate ?object\n\
}',params);

xdmp.redirectResponse(home);
}
else
{
//create triples from web form;
xdmp.log("Got triple info and inserting subject = " + subject + " predicate = " + predicate + " object = " + object);
  var tripleArray = new Array();

  if (predicate.indexOf("location") > -1)
    var aTriple = sem.triple(sem.iri("http://dbpedia.org/resource/" + subject), sem.iri("http://wb.com/props#" + predicate), sem.iri("http://dbpedia.org/ontology/" + object));
  else if (predicate.indexOf("hasBrand") > -1)
    var aTriple = sem.triple(sem.iri("http://wb.com/props#" + subject), sem.iri("http://wb.com/props#" + predicate), sem.iri("http://corp.com/corp:" + object));
  else if (predicate.indexOf("hasLifeStyle") > -1)
    var aTriple = sem.triple(sem.iri("http://wb.com/props#" + subject), sem.iri("http://wb.com/props#" + predicate), sem.iri("http://corp.com/corp:" + object));
  else if (predicate.indexOf("contributedTo") > -1)
    var aTriple = sem.triple(sem.iri("http://wb.com/props#" + subject), sem.iri("http://wb.com/props#" + predicate), sem.iri("http://corp.com/corp:" + object));
  else
    var aTriple = sem.triple(sem.iri("http://dbpedia.org/resource/" + subject), sem.iri("http://wb.com/props#" + predicate), sem.iri("http://dbpedia.org/ontology/" + object));

  var ahoc = {'modeFlag': 'adHocMode'};
  tripleArray.push(aTriple);
  ahoc.ahocTriples = tripleArray;
  var randNum = xdmp.random(100000);
  var docName = fn.concat('adHocTriple-',randNum,'.json');
  xdmp.log("About to insert " + aTriple)
  xdmp.documentInsert(docName ,ahoc, null,"adHocTriple");
  xdmp.redirectResponse(home);
}
