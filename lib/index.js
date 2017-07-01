const readFile = require("./read-file");
const stringToUrl = require("./string-to-url");

const svgoConfig = {
  plugins: [{ removeTitle: {} }]
};

module.exports = filePath => readFile(filePath).then(stringToUrl(svgoConfig));
module.exports.stringToUrl = stringToUrl;
