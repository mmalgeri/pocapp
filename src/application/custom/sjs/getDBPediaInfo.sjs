var getDBPedia = require("/application/xquery/getDBPediaInfo.xqy");
var res = getDBPedia.getInfo("The_Princess_Bride");
var resArray = res.toArray();
resArray.length;