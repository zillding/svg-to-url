const encodeurl = require("encodeurl");

module.exports = svgStr => {
  const encoded = encodeurl(svgStr.replace(/"/g, "'"))
    .replace(/\s{2,}/g, " ")
    .replace(/%20/g, " ");

  return `data:image/svg+xml,${encoded}`;
};
