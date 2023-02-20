#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import clipboardy from "clipboardy";

import svgToUrl from "../lib/index.js";

const program = new Command();
program
  .arguments("<file>")
  .action((filePath) => {
    svgToUrl(filePath)
      .then((data) => {
        console.log(data);
        return data;
      })
      .then(clipboardy.write)
      .then(() => {
        console.log(chalk.green("Copied to clipboard!"));
      })
      .catch((error) => {
        console.error(chalk.red(error));
      });
  })
  .parse(process.argv);
