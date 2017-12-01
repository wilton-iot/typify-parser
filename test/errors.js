define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
/* global describe:true, it:true */
"use strict";

var parser = require("typify-parser/lib/parser.js");
var expect = require("tape-compat").expect;
var describe = require("tape-compat").describe;
var it = require("tape-compat").it;

function fixture(signature) {
  expect(function () {
    parser(signature);
  }).to.throw();
}

describe("errorneous cases", function () {
  it("lexing error", function () {
    fixture("/");
  });

  it("unclosed bracket", function () {
    fixture("[ 1");
  });

  it("typos in record", function () {
    fixture("{");
    fixture("{ :");
    fixture("{ foo: bar");
    fixture("{ foo ; bar }");
  });

  it("traling data", function () {
    fixture("aa ab ;");
  });
});

require = requireOrig;});
