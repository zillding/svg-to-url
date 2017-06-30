const stringToUrl = require("../string-to-url");

const svgStr = `<svg height="210" width="500"><polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;"/>Sorry, your browser does not support inline SVG.</svg>`;

const expectedResult = `data:image/svg+xml,%3Csvg height='210' width='500'%3E%3Cpolygon points='100,10 40,198 190,78 10,78 160,198' style='fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;'/%3ESorry, your browser does not support inline SVG.%3C/svg%3E`;

test("encode svg string to data url", () => {
  expect(stringToUrl(svgStr)).toBe(expectedResult);
});
