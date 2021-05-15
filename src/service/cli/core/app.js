'use strict';

const {Commands} = require(`../commands`);
const {Config} = require(`../assets/config`);
const {CommandsRegister} = require(`./commands-register`);
const {parseRuntimeParameters} = require(`../assets/utils`);

const DEFAULT_COMMAND = `--help`;

class App {
  static start() {
    // Get user's command with arguments
    const {command, args} = parseRuntimeParameters();

    // Saves commands register instance to property of App class to provide it as commands parameter
    App.commandsRegister = new CommandsRegister();
    // Add commands to register first of all
    App.commandsRegister.addEach(Commands);

    // If command specified with wrong prefix or specified command that does not exists
    if (!App._isCommand(command) || !App.commandsRegister.isCommandExists(command)) {
      const defaultCommand = App.commandsRegister.getCommandByName(DEFAULT_COMMAND);
      defaultCommand.execute(App);

      process.exit(Config.Codes.ERROR);
    }

    // Get target command and execute it with specified params
    const invokedCommand = App.commandsRegister.getCommandByName(command);
    invokedCommand.execute(App, args);
  }

  // Returns boolean status that command starts with command prefix
  static _isCommand(str) {
    return str.startsWith(App.commandsRegister.prefix);
  }
}

module.exports = {App};
