'use strict';

var phiRatio = 2 / (1 + Math.sqrt(5));

module.exports = goldenSectionMinimize;

function goldenSectionMinimize (f, xL, xU, tol, maxIter) {
  var xF, fF;
  var n = 0;
  var x1 = xU - phiRatio * (xU - xL);
  var x2 = xL + phiRatio * (xU - xL);
  // Initial bounds:
  var f1 = f(x1);
  var f2 = f(x2);

  // Store these values so that we can return these if they're better.
  // This happens when the minimization falls *approaches* but never
  // actually reaches one of the bounds
  var f10 = f(xL);
  var f20 = f(xU);
  var xL0 = xL;
  var xU0 = xU;

  // Simple, robust golden section minimization:
  while (++n < maxIter && Math.abs(xU - xL) > tol) {
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

  if (n === maxIter) {
    return 0.5 * (f1 + f2);
  }

  if (isNaN(f2) || isNaN(f1)) {
    return NaN;
  }

  xF = 0.5 * (xU + xL);
  fF = 0.5 * (f1 + f2);

  if (f10 < fF) {
    return xL0;
  } else if (f20 < fF) {
    return xU0;
  } else {
    return xF;
  }
}
