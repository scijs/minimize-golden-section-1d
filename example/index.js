'use strict';

var minimize = require('../');

console.log('min(cos) at x =', minimize(Math.cos));

console.log('min(cos), 0 < x < 1 at x =', minimize(Math.cos, {lowerBound: 0, upperBound: 1}));

console.log('min(cos), guess = -3 at x =', minimize(Math.cos, {guess: -3}));
