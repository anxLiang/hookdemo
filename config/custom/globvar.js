const NODE_ENV = process.env.NODE_ENV;

var GLOB_VAR = {};
var HTTP_PREFIX = "";
if (NODE_ENV === "production") {

} else if (NODE_ENV === "development") {

}
GLOB_VAR.HTTP_PREFIX = HTTP_PREFIX;

module.exports = GLOB_VAR;