'use strict';

const {Command} = require(`../../core/command`);

// Command shows app version in console
class VersionCommand extends Command {
  constructor(executor) {
    super();
    this._name = `version`;
    this._description = `выводит номер версии`;
    this._executor = executor;
  }

  execute() {
    this._executor();
  }
}

module.exports = {VersionCommand};
