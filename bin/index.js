#!/usr/bin/env node

const updateNotifier = require("update-notifier");
const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");

const pkg = require("../package.json");

const svgToUrl = require("../lib/index");

updateNotifier({ pkg }).notify();

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
