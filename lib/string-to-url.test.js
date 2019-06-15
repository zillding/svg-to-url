const stringToUrl = require("./string-to-url");

const svgoConfig = {
  plugins: [{ removeTitle: {} }]
};

test("it converts dirty svg string to svgo optimized data url", async () => {
  const getDataUrl = stringToUrl(svgoConfig);

  expect(await getDataUrl(`<svg title="hello"></svg>`)).toBe(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
  );

  expect(
    await getDataUrl(`
      <svg width="26" height="26" focusable="false" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="13" cy="9" r="6"/>
          <path stroke-linecap="round" d="M21.5 22.9c0-4.1-3.9-7.8-8.5-7.8s-8.5 3.4-8.5 7.8"/>
        </g>
      </svg>
    `)
  ).toBe(
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Cg fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='13' cy='9' r='6'/%3E%3Cpath stroke-linecap='round' d='M21.5 22.9c0-4.1-3.9-7.8-8.5-7.8s-8.5 3.4-8.5 7.8'/%3E%3C/g%3E%3C/svg%3E`
  );
});

test("it throws error when svg string is malformed", async () => {
  await expect(stringToUrl(svgoConfig)(`<svg></`)).rejects.toThrow(
    "Error in parsing SVG: Unclosed root tag\nLine: 0\nColumn: 7\nChar:"
  );
});

describe("encodeStr", () => {
  test("it encodes svg string to data url", () => {
    expect(
      stringToUrl.encodeStr(
        `<svg height="210" width="500"><polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:#ddd;stroke:purple;stroke-width:5;fill-rule:nonzero;"/>Sorry, your browser does not support inline SVG.</svg>`
      )
    ).toBe(
      `data:image/svg+xml,%3Csvg height='210' width='500'%3E%3Cpolygon points='100,10 40,198 190,78 10,78 160,198' style='fill:%23ddd;stroke:purple;stroke-width:5;fill-rule:nonzero;'/%3ESorry, your browser does not support inline SVG.%3C/svg%3E`
    );
  });
});
