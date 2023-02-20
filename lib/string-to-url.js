import SVGO from "svgo";

const svgo = (config) => async (data) => {
  const { plugins = [], ...rest } = config || {};
  const result = await new SVGO({
    ...rest,
    plugins: [
      ...plugins,
      {
        removeXMLNS: true,
      },
    ],
  }).optimize(data);
  return result.data.replace(
    /^<svg/g,
    `<svg xmlns="http://www.w3.org/2000/svg"`
  );
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

export default (svgoConfig) => async (data) =>
  encodeStr(await svgo(svgoConfig)(data));
