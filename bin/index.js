#!/usr/bin/env node

const fs = require("fs");
const program = require("commander");
const chalk = require("chalk");
const ncp = require("copy-paste");

const svgToUrl = require("../lib/index");

const copy = data =>
  new Promise(resolve => {
    ncp.copy(data, resolve);
  });

program
  .arguments("<file>")
  .action(filePath => {
    svgToUrl(filePath)
      .then(data => {
        console.log(data);
        return data;
      })
      .then(copy)
      .then(() => {
        console.log(chalk.green("Copied to clipboard!"));
      })
      .catch(error => {
        console.error(chalk.red(error));
      });
  })
  .parse(process.argv);
