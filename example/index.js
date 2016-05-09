'use strict';

var minimize = require('../');

console.log(minimize(Math.cos));

console.log(minimize(Math.cos, {lowerBound: 0, upperBound: 1}));

console.log(minimize(Math.cos, {guess: -3}));
