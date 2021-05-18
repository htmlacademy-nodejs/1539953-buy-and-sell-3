'use strict';

const {Command} = require(`../../core/command`);

// Default cli app command. Prints help text
class HelpCommand extends Command {
  constructor(executor) {
    super();
    this._name = `help`;
    this._description = `печатает этот текст`;
    this._executor = executor;
  }

  execute(app) {
    const commandPrefix = app.commandsRegister.prefix;
    const registeredCommands = app.commandsRegister.commands;

    this._executor(commandPrefix, registeredCommands);
  }
}

module.exports = {HelpCommand};
