const readFile = require("./read-file");
const stringToUrl = require("./string-to-url");

module.exports = (filePath) => readFile(filePath).then(stringToUrl());
module.exports.stringToUrl = stringToUrl;
