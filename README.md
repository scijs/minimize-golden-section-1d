# minimize-golden-section-1d

[![Build Status][travis-image]][travis-url] [![npm version][npm-image]][npm-url]  [![Dependency Status][david-image]][david-url] [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

> Minimize a function of a single variable using [golden section search](https://en.wikipedia.org/wiki/Golden_section_search)

## Introduction

Minimize a function of a single variable using [golden section search](https://en.wikipedia.org/wiki/Golden_section_search), a search algorithm similar to bisection search except that the size of the intervals is chosen so that function evaluations can be reused more effectively. The golden section works fine with discontinuities, asymptotes, or oscillations that would throw off derivative-based methods but is somewhat slower to converge, ultimately requiring more function evaluations.

## Installation

```bash
$ npm install minimize-golden-section-1d
```

## Example

```javascript
var minimize = require('minimize-golden-section-1d');

minimize(Math.cos)
// => 3.1415926622945616

minimize(Math.cos, {lowerBound: 0, upperBound: 1});
// => 0.9999999956298697

minimize(Math.cos, {guess: -3});
// => -3.1415926432597825
```

## Usage

#### `require('minimize-golden-section-1d')(f[, options])`

Given function `f` of one `Number`-valued variable, computes a local minimum. On successful completion, returns the value of the argument that minimizes `f` (note that this may either be a local or global minimum in the provided range). If tolerance is not met or the algorithm otherwise fails (e.g. NaN encountered or unconstrained divergence of the argument to `Infinity`), returns `NaN`.

If bounds are provided, this module proceeds immediately with golden section search. If upper, lower or both bounds are not provided, the algorithm will make use of an initial guess (a provided guess or just one of the bounds if that's all it has) and expand the search range until a minimum is bracketed.

##### Options:
- `tolerance [=1e-8]`: Convergence tolerance. Algorithm continues until search interval is smaller than `tolerance`.
- `lowerBound [=-Infinity]`: Lower bound of the search interval
- `upperBound [=Infinity]`: Upper bound of the search interval
- `maxIter [=100]`: Maximum number of iterations for either bracketing or search phase.
- `guess [=0]`: initial guess for unconstrained minimization. Unused unless both `upperBound` and `lowerBound` are not provided.
- `initialIncrement [=1]`: Initial interval by which to expand the search interval for unconstrained minimization. Unused unless both `upperBound` and `lowerBound` are not provided.

## License
&copy; 2015 [Scijs](https://github.com/scijs). MIT License.

## Authors
Ricky Reusser

[travis-image]: https://travis-ci.org/scijs/minimize-golden-section-1d.svg?branch=master
[travis-url]: https://travis-ci.org/scijs/minimize-golden-section-1d
[npm-image]: https://badge.fury.io/js/minimize-golden-section-1d.svg
[npm-url]: http://badge.fury.io/js/minimize-golden-section-1d
[david-image]: https://david-dm.org/scijs/minimize-golden-section-1d.svg
[david-url]: https://david-dm.org/scijs/minimize-golden-section-1d
