'use strict';

// Parent class for commands classes
class Command {
  constructor() {
    this._name = `command`;
    this._description = `No description`;
    this._params = [];
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get params() {
    return this._params;
  }

  execute() {
    console.error(`Command '${this.name}' is not implemented`);
  }
}

module.exports = {Command};
