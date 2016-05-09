'use strict';

var goldenSectionMinimize = require('./src/golden-section-minimize');
var bracketMinimum = require('./src/bracket-minimum');

module.exports = function minimize (f, options) {
  options = options || {};
  var x0, bounds;
  var tolerance = options.tolerance === undefined ? 1e-8 : options.tolerance;
  var dx = options.initialIncrement === undefined ? 1 : options.initialIncrement;
  var xMin = options.lowerBound === undefined ? -Infinity : options.lowerBound;
  var xMax = options.upperBound === undefined ? Infinity : options.upperBound;
  var maxIter = options.maxIter === undefined ? 100 : options.maxIter;

  if (isFinite(xMax) && isFinite(xMin)) {
    bounds = [xMin, xMax];
  } else {
    // Construct the best guess we can:
    if (options.guess === undefined) {
      if (xMin > -Infinity) {
        x0 = xMax < Infinity ? 0.5 * (xMin + xMax) : xMin;
      } else {
        x0 = xMax < Infinity ? xMax : 0;
      }
    } else {
      x0 = options.guess;
    }

    bounds = bracketMinimum(f, x0, dx, xMin, xMax, maxIter);

    if (isNaN(bounds[0]) || isNaN(bounds[1])) {
      return NaN;
    }
  }

  return goldenSectionMinimize(f, bounds[0], bounds[1], tolerance, maxIter);
};
