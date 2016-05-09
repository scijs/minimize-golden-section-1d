'use strict';

var phiRatio = 2 / (1 + Math.sqrt(5));

module.exports = goldenSectionMinimize;

function goldenSectionMinimize (f, xL, xU, tol, maxIter) {
  var n = 0;
  var x1 = xU - phiRatio * (xU - xL);
  var x2 = xL + phiRatio * (xU - xL);
  var f1 = f(x1);
  var f2 = f(x2);
  while (++n < maxIter && Math.abs(xU - xL) > tol) {
    // Simple, robust golden section minimization:
    if (f2 > f1) {
      xU = x2;
      x2 = x1;
      f2 = f1;
      x1 = xU - phiRatio * (xU - xL);
      f1 = f(x1);
    } else {
      xL = x1;
      x1 = x2;
      f1 = f2;
      x2 = xL + phiRatio * (xU - xL);
      f2 = f(x2);
    }
  }

  if (n === maxIter || isNaN(f2) || isNaN(f1)) {
    return NaN;
  }

  return 0.5 * (xU + xL);
}
