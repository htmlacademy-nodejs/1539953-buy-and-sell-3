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
    console.error(`Command '${this.name}' is not implemented or executor is not defined`);
  }

  // Returns valid user parameter that might be integer or returns specified default
  validateUserNumberParameter(specifiedValue, defaultValue) {
    const numberSpecifiedValue = parseInt(specifiedValue, 10);

    // Validates on Not A Number in case of parsing number from string
    if (isNaN(numberSpecifiedValue)) {
      return defaultValue;
    }

    return Math.abs(numberSpecifiedValue);
  }
}

module.exports = {Command};
