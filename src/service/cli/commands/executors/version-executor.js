'use strict';

const chalk = require(`chalk`);
const packageJsonFile = require(`../../../../../package.json`);

const versionExecutor = () => {
  const version = packageJsonFile.version;
  console.info(chalk.blue(`v${version}`));
};

module.exports = {versionExecutor};
