function get(context, params) {
  // return zero or more document nodes

var result = xdmp.invoke("/application/custom/sjs/rtLoadTop10MovieReviews.sjs",null,{"userId": xdmp.user("admin")});

xdmp.setResponseContentType("text/html");
return "Done loading top 10 movie reviews";

};

function post(context, params, input) {
  // return zero or more document nodes
};

function put(context, params, input) {
  // return at most one document node
};

function deleteFunction(context, params) {
  // return at most one document node
};

exports.GET = get;
exports.POST = post;
exports.PUT = put;
exports.DELETE = deleteFunction;