/* global describe, it */
'use strict';

var assert = require('chai').assert;
var almostEqual = require('almost-equal');
var minimize = require('../');

assert.almostEqual = function (computed, expected, tol) {
  tol = tol === undefined ? almostEqual.FLT_EPSILON : tol;
  var ae = almostEqual(computed, expected, tol, tol);

  if (!ae) {
    throw new Error('Expected ' + computed + ' to equal ' + expected + ' (±' + tol + ')');
  }
};

describe('minimize', function () {
  it('Minimizes 1 / (x - 1) in [0, 2]', function () {
    assert.almostEqual(minimize(function (x) { return 1 / (x - 1); }, {
      lowerBound: 0,
      upperBound: 2
    }), 1);
  });

  it('Minimizes -1 / (x - 1) in [0, 2]', function () {
    assert.almostEqual(minimize(function (x) { return -1 / (x - 1); }, {
      lowerBound: 0,
      upperBound: 2
    }), 1);
  });

  it('Minimizes sqrt(x) in [0, inf)', function () {
    assert.almostEqual(minimize(Math.sqrt, {
      lowerBound: 0
    }), 0);
  });

  it('Fails to minimize sqrt(x) in (-inf, inf)', function () {
    assert.isNaN(minimize(Math.sqrt), 0);
  });

  it('returns NaN if tolerance not met', function () {
    assert.isNaN(minimize(function (x) { return x * (x - 2); }, {
      tolerance: 0
    }));
  });

  it('minimizes a x(x-2) in (-inf, inf)', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }), 1);
  });

  it('minimizes x(x-2) in [-6, inf)', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }, {
      lowerBound: -6
    }), 1);
  });

  it('minimizes x(x-2) in (-inf, -6]', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }, {
      upperBound: -6
    }), -6);
  });

  it('minimizes x(x-2) in [6, inf)', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }, {
      lowerBound: 6
    }), 6);
  });

  it('minimizes x(x-2) in [5, 6]', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }, {
      lowerBound: 5,
      upperBound: 6
    }), 5);
  });

  it('minimizes a cubic', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: 0,
      upperBound: 3
    }), (3 + Math.sqrt(3)) / 3);
  });

  it('minimizes a cubic', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: -3,
      upperBound: 3
    }), -3);
  });

  it('maximizes a cubic', function () {
    assert.almostEqual(minimize(function (x) { return -(x * (x - 2) * (x - 1)); }, {
      lowerBound: 0,
      upperBound: 3
    }), (3 - Math.sqrt(3)) / 3);
  });

  it('minimizes a cubic against bounds', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: 5,
      upperBound: 6
    }), 5);
  });

  it('minimizes a cubic against one bound', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: 5
    }), 5);
  });

  it('fails to minimize a cubic with no bounds', function () {
    assert.isNaN(minimize(function (x) { return x * (x - 2) * (x - 1); }));
  });

  it('minimizes a parabola with small starting increment', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }, {
      guess: 0,
      initialIncrement: 1e-4
    }), 1);
  });

  it('minimizes a parabola with small starting increment and bounds', function () {
    assert.almostEqual(minimize(function (x) { return x * (x - 2); }, {
      guess: 0,
      lowerBound: 0,
      upperBound: 1,
      initialIncrement: 1e-4
    }), 1);
  });

  it('minimizes cosine', function () {
    assert.almostEqual(minimize(Math.cos), Math.PI);
  });

  it('minimizes sine', function () {
    assert.almostEqual(minimize(Math.sin), -Math.PI * 0.5);
  });

  it('minimizes a line', function () {
    assert.almostEqual(minimize(function (x) { return x; }, {
      lowerBound: 0.5,
      upperBound: 1
    }), 0.5);
  });

  it('minimizes a cusp', function () {
    assert.almostEqual(minimize(function (x) { return Math.sqrt(Math.abs(x - 5)); }), 5);
  });
});

