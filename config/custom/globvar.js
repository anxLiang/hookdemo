"use stric";
const NODE_ENV = process.env.NODE_ENV;

var GLOB_VAR = {
  RUN_TYPE: process.env.runType,
  HTTP_PREFIX: ""
};

if (NODE_ENV === "production") {
} else if (NODE_ENV === "development") {
}

module.exports = GLOB_VAR;
