const SVGO = require("svgo");

module.exports = config => data =>
  new Promise((resolve, reject) => {
    const svgo = new SVGO(config);

    svgo.optimize(data, result => {
      if (result.error) {
        reject(result.error);
      } else {
        resolve(result.data);
      }
    });
  });
