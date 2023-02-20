import stringToUrl, { encodeStr } from "./string-to-url.js";

test("it converts dirty svg string to svgo optimized data url", () => {
  const getDataUrl = stringToUrl();

  expect(getDataUrl(`<svg title="hello"></svg>`)).toBe(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
  );

  expect(
    getDataUrl(`
      <svg width="26" height="26" focusable="false" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="13" cy="9" r="6"/>
          <path stroke-linecap="round" d="M21.5 22.9c0-4.1-3.9-7.8-8.5-7.8s-8.5 3.4-8.5 7.8"/>
        </g>
      </svg>
    `)
  ).toBe(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cg fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='13' cy='9' r='6'/%3E%3Cpath stroke-linecap='round' d='M21.5 22.9c0-4.1-3.9-7.8-8.5-7.8s-8.5 3.4-8.5 7.8'/%3E%3C/g%3E%3C/svg%3E"
  );
});

test("it accepts custom svgo config", () => {
  const getDataUrl = stringToUrl({
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  });

  expect(
    getDataUrl(`
      <svg width="26" height="26" focusable="false" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="13" cy="9" r="6"/>
          <path stroke-linecap="round" d="M21.5 22.9c0-4.1-3.9-7.8-8.5-7.8s-8.5 3.4-8.5 7.8"/>
        </g>
      </svg>
    `)
  ).toBe(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Cg fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='13' cy='9' r='6'/%3E%3Cpath stroke-linecap='round' d='M21.5 22.9c0-4.1-3.9-7.8-8.5-7.8s-8.5 3.4-8.5 7.8'/%3E%3C/g%3E%3C/svg%3E"
  );
});

test("it throws error when svg string is malformed", () => {
  expect(() => stringToUrl()("<svg></")).toThrow(
    "<input>:1:7: Unclosed root tag"
  );
});

describe("encodeStr", () => {
  test("it encodes svg string to data url", () => {
    expect(
      encodeStr(
        `<svg height="210" width="500"><polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:#ddd;stroke:purple;stroke-width:5;fill-rule:nonzero;"/>Sorry, your browser does not support inline SVG.</svg>`
      )
    ).toBe(
      "data:image/svg+xml,%3Csvg height='210' width='500'%3E%3Cpolygon points='100,10 40,198 190,78 10,78 160,198' style='fill:%23ddd;stroke:purple;stroke-width:5;fill-rule:nonzero;'/%3ESorry, your browser does not support inline SVG.%3C/svg%3E"
    );
  });
});
