#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");

const svgToUrl = require("../lib/index");

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
