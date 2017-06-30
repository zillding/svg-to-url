const fs = require("fs");

module.exports = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
