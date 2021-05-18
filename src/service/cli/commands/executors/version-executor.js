'use strict';

const packageJsonFile = require(`../../../../../package.json`);

const versionExecutor = () => {
  const version = packageJsonFile.version;
  console.info(`v${version}`);
};

module.exports = {versionExecutor};
