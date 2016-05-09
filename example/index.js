'use strict';

var minimize = require('../');

console.log(minimize(Math.cos));

console.log(minimize(Math.cos, {upperBound: 1}));

console.log(minimize(Math.cos, {guess: -3}));
