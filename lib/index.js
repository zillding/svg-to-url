const readFile = require("./read-file");
const svgo = require("./svgo");
const stringToUrl = require("./string-to-url");

const svgoConfig = {
  plugins: [{ removeTitle: {} }]
};

module.exports = filePath =>
  readFile(filePath).then(svgo(svgoConfig)).then(stringToUrl);
