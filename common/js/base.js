"use strict";

/* global COMMONLIBRARY */
var COMMONLIBRARY = COMMONLIBRARY || {};

/**
 * namespace 생성
 */
COMMONLIBRARY.createNs = function createNs(ns) {
  var parts = ns.split(".");
  var parent = COMMONLIBRARY;
  var partsLen;
  var i;
  if (parts[0] === "COMMONLIBRARY") {
    parts = parts.slice(1);
  }
  partsLen = parts.length;
  for (i = 0; i < partsLen; i++) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
};
