const SVGO = require("svgo");

const svgo = config => data =>
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

const encodeStr = svgStr => {
  const encoded = encodeURIComponent(svgStr)
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3B/g, ";")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%2C/g, ",")
    .replace(/%22/g, "'");

  return `data:image/svg+xml,${encoded}`;
};

module.exports = svgoConfig => data => svgo(svgoConfig)(data).then(encodeStr);
module.exports.encodeStr = encodeStr;
