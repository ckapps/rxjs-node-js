<div style="text-align: center;">

![CI][ci-main-badge]
[![Coverage Status][cov-badge]][cov-url]

</div>
<div style="text-align: center;">

[![npm version][npm-latest-badge]][npm-latest-url]

</div>

# @ckapp/rxjs-node-process

This package contains [RxJS][dep-rxjs-npm-url] observable/operators for the `process` module of `node.js`.

## Installation and Usage

### ES6 via npm

```sh
npm i @ckapp/rxjs-node-process
```

## Whats in there?

### Observables

- `platform$`

### Operators

- `filterNotOnPlatforms`
- `filterOnPlatforms`
- `takeOnPlatforms`
- `skipOnPlatforms`

[cov-badge]: https://coveralls.io/repos/github/ckapps/rxjs-node-js/badge.svg?branch=main
[cov-url]: https://coveralls.io/github/ckapps/rxjs-node-js?branch=main
[dep-rxjs-npm-url]: https://www.npmjs.com/package/rxjs
[ci-main-badge]: https://github.com/ckapps/rxjs-node-js/workflows/CI/badge.svg
[npm-latest-badge]: https://img.shields.io/npm/v/@ckapp/rxjs-node-process/latest.svg
[npm-latest-url]: https://www.npmjs.com/@ckapp/rxjs-node-process
