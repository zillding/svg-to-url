# svg-to-url

[![Build Status](https://travis-ci.org/zillding/svg-to-url.svg?branch=master)](https://travis-ci.org/zillding/svg-to-url) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A node utility to convert svg to data url

## Installation

`npm install -g svg-to-url`

## Usage

### Use from command line

`svg-to-url path/to/file.svg`

### Use as a node module

```js
const svgToUrl = require('svg-to-url');

svgToUrl('path/to/file.svg')
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  })
```
