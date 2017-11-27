define(function(){var require = WILTON_requiresync;var module = {exports: {}};var exports = module.exports;
/* global describe:true, it:true */
"use strict";

var parser = require("typify-parser/lib/parser.js");
var expect = require("tape-compat").expect;
var describe = require("tape-compat").describe;
var it = require("tape-compat").it;

function fixture(signature, json) {
  expect(parser(signature)).to.deep.equal(json);
}

describe("simple cases", function () {
  it("top, bottom, unit", function () {
    fixture("*", { type: "true" });
    fixture("_|_", { type: "false" });
    fixture("()", { type: "unit" });

    fixture("⊤", { type: "true" });
    fixture("⊥", { type: "false" });
  });

  it("booleans", function () {
    fixture("true", { type: "bool", value: true });
    fixture("false", { type: "bool", value: false });
  });

  it("numbers", function () {
    fixture("1", { type: "number", value: 1 });
  });

  it("strings", function () {
    fixture("'foo'", { type: "string", value: "foo" });
    fixture("\"foo\"", { type: "string", value: "foo" });
    fixture("'\n'", { type: "string", value: "\n" });
    fixture("'\\n'", { type: "string", value: "\n" });
    fixture("'\\\''", { type: "string", value: "'" });
    fixture("'\\\"'", { type: "string", value: "\"" });
    fixture("\"\\\'\"", { type: "string", value: "'" });
    fixture("\"\\\"\"", { type: "string", value: "\"" });
  });

  it("ident", function () {
    fixture("name", { type: "ident", value: "name" });
  });

  it("record", function () {
    fixture("{}", {
      type: "record",
      fields: {},
    });
    fixture("{ a: foo }", {
      type: "record",
      fields: {
        a: { type: "ident", value: "foo" },
      }
    });
    fixture("{ a: foo; b: bar }", {
      type: "record",
      fields: {
        a: { type: "ident", value: "foo" },
        b: { type: "ident", value: "bar" },
      }
    });
  });

  it("application", function () {
    fixture("foo bar", {
      type: "application",
      callee: { type: "ident", value: "foo" },
      args: [
        { type: "ident", value: "bar" },
      ],
    });

    fixture("foo bar baz", {
      type: "application",
      callee: { type: "ident", value: "foo" },
      args: [
        { type: "ident", value: "bar" },
        { type: "ident", value: "baz" },
      ],
    });
  });

  it("optional", function () {
    fixture("true?", {
      type: "optional",
      arg: { type: "bool", value: true },
    });
  });

  it("conjunction", function () {
    fixture("1 & 2", {
      type: "conjunction",
      args: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
      ],
    });

    fixture("1 ∧ 2", {
      type: "conjunction",
      args: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
      ],
    });
  });

  it("disjunction", function () {
    fixture("1 | 2", {
      type: "disjunction",
      args: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
      ],
    });

    fixture("1 ∨ 2", {
      type: "disjunction",
      args: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
      ],
    });
  });

  it("product", function () {
    fixture("1 , 2", {
      type: "product",
      args: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
      ],
    });

    fixture("1 × 2", {
      type: "product",
      args: [
        { type: "number", value: 1 },
        { type: "number", value: 2 },
      ],
    });
  });

  it("parentheses", function () {
    fixture("(1)", { type: "number", value: 1 });
  });

  it("square brackets", function () {
    fixture("[1]", {
      type: "brackets",
      arg: { type: "number", value: 1 },
    });
  });

  it("function", function () {
    fixture("1 -> 2", {
      type: "function",
      arg: { type: "number", value: 1 },
      result: { type: "number", value: 2 },
    });

    fixture("1 → 2", {
      type: "function",
      arg: { type: "number", value: 1 },
      result: { type: "number", value: 2 },
    });
  });

  it("variadic", function () {
    fixture("foo...", {
      type: "variadic",
      arg: { type: "ident", value: "foo" },
    });

    fixture("foo…", {
      type: "variadic",
      arg: { type: "ident", value: "foo" },
    });
  });

  it("named", function () {
    fixture("foo: bar", {
      type: "named",
      name: "foo",
      arg: { type: "ident", value: "bar" }
    });
  });
});

return module.exports;});
