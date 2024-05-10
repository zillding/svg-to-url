import { readFile } from "node:fs/promises";
import stringToUrl from "./string-to-url.js";

export default async (filePath) => stringToUrl()(await readFile(filePath));
export { stringToUrl };
