'use strict';

class CommandsRegister {
  constructor() {
    this._commands = new Map();
    this._prefix = `--`;
  }

  get commands() {
    return this._commands;
  }

  get prefix() {
    return this._prefix;
  }

  // Adds each command to register
  addEach(commands) {
    commands.forEach((command) => {
      const prefixedName = this.prefix + command.name;
      this.commands.set(prefixedName, command);
    });
  }

  getCommandByName(name) {
    return this.commands.get(name);
  }

  // Returns boolean status of command existence
  isCommandExists(command) {
    return this.commands.has(command);
  }
}

module.exports = {CommandsRegister};
