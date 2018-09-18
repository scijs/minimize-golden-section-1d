'use strict';

module.exports = bracketMinimum;

function bracketMinimum (bounds, f, x0, dx, xMin, xMax, maxIter) {
  // If either size is unbounded (=infinite), Expand the guess
  // range until we either bracket a minimum or until we reach the bounds:
  var fU, fL, fMin, n, xL, xU, bounded;
  n = 1;
  xL = x0;
  xU = x0;
  fMin = fL = fU = f(x0);
  while (!bounded && isFinite(dx) && !isNaN(dx)) {
    ++n;
    bounded = true;

    if (fL <= fMin) {
      fMin = fL;
      xL = Math.max(xMin, xL - dx);
      fL = f(xL);
      bounded = false;
    }
    if (fU <= fMin) {
      fMin = fU;
      xU = Math.min(xMax, xU + dx);
      fU = f(xU);
      bounded = false;
    }

    // Track the smallest value seen so far:
    fMin = Math.min(fMin, fL, fU);

    // If either of these is the case, then the function appears
    // to be minimized against one of the bounds, so although we
    // haven't bracketed a minimum, we'll considere the procedure
    // complete because we appear to have bracketed a minimum
    // against a bound:
    if ((fL === fMin && xL === xMin) || (fU === fMin && xU === xMax)) {
      bounded = true;
    }

    // Increase the increment at a very quickly increasing rate to account
    // for the fact that we have *no* idea what floating point magnitude is
    // desirable. In order to avoid this, you should really provide *any
    // reasonable bounds at all* for the variables.
    dx *= n < 4 ? 2 : Math.exp(n * 0.5);

    if (!isFinite(dx)) {
      bounds[0] = -Infinity;
      bounds[1] = Infinity;
      return bounds;
    }
  }

  bounds[0] = xL;
  bounds[1] = xU;
  return bounds;
}
