'use strict';

const {Command} = require(`../core/command`);
const packageJsonFile = require(`../../../../package.json`);

// Command shows app version in console
class VersionCommand extends Command {
  constructor() {
    super();
    this._name = `version`;
    this._description = `выводит номер версии`;
  }

  execute() {
    const version = packageJsonFile.version;
    console.info(`v${version}`);
  }
}

module.exports = {VersionCommand};
