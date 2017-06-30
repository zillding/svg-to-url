module.exports = svgStr => {
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
