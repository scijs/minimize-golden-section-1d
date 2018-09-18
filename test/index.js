'use strict';

var minimize = require('../');

var test = require('tape');
var almostEqual = require('almost-equal');

function assertAlmostEqual (t, computed, expected, tol) {
  tol = tol === undefined ? almostEqual.FLT_EPSILON : tol;
  t.ok(almostEqual(computed, expected, tol, tol, 'Expected ' + computed + ' to equal ' + expected + ' (±' + tol + ')'));
}

test('minimize', function (t) {
  t.test('Minimizes 1 / (x - 1) in [0, 2]', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return 1 / (x - 1); }, {
      lowerBound: 0,
      upperBound: 2
    }), 1);
    t.end();
  });

  t.test('Minimizes -1 / (x - 1) in [0, 2]', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return -1 / (x - 1); }, {
      lowerBound: 0,
      upperBound: 2
    }), 1);
    t.end();
  });

  t.test('Minimizes sqrt(x) in [0, inf)', function (t) {
    assertAlmostEqual(t, minimize(Math.sqrt, {
      lowerBound: 0
    }), 0);
    t.end();
  });

  t.test('Minimizes sqrt(|x|) in (-inf, inf)', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return Math.sqrt(Math.abs(x)); }), 0);
    t.end();
  });

  t.test('returns answer if tolerance not met', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {tolerance: 0}), -1);
    t.end();
  });

  t.test('minimizes a x(x-2) in (-inf, inf)', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }), 1);
    t.end();
  });

  t.test('minimizes x(x-2) in [-6, inf)', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {
      lowerBound: -6
    }), 1);
    t.end();
  });

  t.test('minimizes x(x-2) in (-inf, -6]', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {
      upperBound: -6
    }), -6);
    t.end();
  });

  t.test('minimizes x(x-2) in [6, inf)', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {
      lowerBound: 6
    }), 6);
    t.end();
  });

  t.test('minimizes x(x-2) in [5, 6]', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {
      lowerBound: 5,
      upperBound: 6
    }), 5);
    t.end();
  });

  t.test('minimizes a cubic', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: 0,
      upperBound: 3
    }), (3 + Math.sqrt(3)) / 3);
    t.end();
  });

  t.test('minimizes a cubic', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: -3,
      upperBound: 3
    }), -3);
    t.end();
  });

  t.test('maximizes a cubic', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return -(x * (x - 2) * (x - 1)); }, {
      lowerBound: 0,
      upperBound: 3
    }), 3);
    t.end();
  });

  t.test('minimizes a cubic against bounds', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: 5,
      upperBound: 6
    }), 5);
    t.end();
  });

  t.test('minimizes a cubic against one bound', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2) * (x - 1); }, {
      lowerBound: 5
    }), 5);
    t.end();
  });

  t.test('fails to minimize a cubic with no bounds', function (t) {
    t.ok(isNaN(minimize(function (x) { return x * (x - 2) * (x - 1); })));
    t.end();
  });

  t.test('minimizes a parabola with small starting increment', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {
      guess: 0,
      initialIncrement: 1e-4
    }), 1);
    t.end();
  });

  t.test('minimizes a parabola with small starting increment and bounds', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x * (x - 2); }, {
      guess: 0,
      lowerBound: 0,
      upperBound: 1,
      initialIncrement: 1e-4
    }), 1);
    t.end();
  });

  t.test('minimizes cosine', function (t) {
    assertAlmostEqual(t, Math.cos(minimize(Math.cos)), -1);
    t.end();
  });

  t.test('minimizes cosine', function (t) {
    assertAlmostEqual(t, minimize(Math.cos), Math.PI);
    t.end();
  });

  t.test('minimizes cosine', function (t) {
    assertAlmostEqual(t, minimize(Math.cos), Math.PI);
    t.end();
  });

  t.test('minimizes cosine', function (t) {
    assertAlmostEqual(t, minimize(Math.cos, {lowerBound: 0, upperBound: 1}), 1);
    t.end();
  });

  t.test('minimizes cosine', function (t) {
    assertAlmostEqual(t, minimize(Math.cos, {guess: -3}), -Math.PI);
    t.end();
  });

  t.test('minimizes sine', function (t) {
    assertAlmostEqual(t, minimize(Math.sin), -Math.PI * 0.5);
    t.end();
  });

  t.test('minimizes a line', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return x; }, {
      lowerBound: 0.5,
      upperBound: 1
    }), 0.5);
    t.end();
  });

  t.test('minimizes a cusp', function (t) {
    assertAlmostEqual(t, minimize(function (x) { return Math.sqrt(Math.abs(x - 5)); }), 5);
    t.end();
  });
});
