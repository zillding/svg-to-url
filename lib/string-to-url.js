import { optimize } from "svgo";

const svgo = (config) => (data) => {
  const { plugins = [], ...rest } = config || {};
  return optimize(data, {
    ...rest,
    plugins: [
      ...(plugins.length > 0 ? plugins : ["preset-default"]),
      "removeXMLNS",
    ],
  }).data.replace(/^<svg/g, `<svg xmlns="http://www.w3.org/2000/svg"`);
};

export function encodeStr(svgStr) {
  const encoded = encodeURIComponent(svgStr)
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3B/g, ";")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%2C/g, ",")
    .replace(/%22/g, "'");

  return `data:image/svg+xml,${encoded}`;
}

export default (svgoConfig) => (data) => encodeStr(svgo(svgoConfig)(data));
