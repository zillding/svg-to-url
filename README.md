# svg-to-url

[![npm](https://img.shields.io/npm/v/svg-to-url.svg)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A node utility to convert svg to svgo optimized data url

Powered by [svgo](https://github.com/svg/svgo)

## Installation

`npm install -g svg-to-url`

## Usage

### Use from command line

```sh
$ cat path/to/circle.svg
<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
$ svg-to-url path/to/circle.svg
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23000' stroke-width='3' fill='red'/%3E%3C/svg%3E
Copied to clipboard!
```

### Use as a node module

```js
import svgToUrl from "svg-to-url";

const result = await svgToUrl("path/to/circle.svg");
console.log(result);
// data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23000' stroke-width='3' fill='red'/%3E%3C/svg%3E
```

If only the svg string processor is needed, there is another api exposed.

```js
import { stringToUrl } from "svg-to-url";

// optional custom svgo config: https://github.com/svg/svgo
const svgoConfig = {
  plugins: [...]
};
const getUrlFromSvgString = stringToUrl(svgoConfig);

const resultUrl = getUrlFromSvgString("<svg>...</svg>");
```
