'use strict';

const {Command} = require(`../../core/command`);
const {Config} = require(`../../assets/config`);

// Command starts http server on specified port
class ServerCommand extends Command {
  constructor(executor) {
    super();

    this._name = `server`;
    this._description = `запускает сервер на указанном порту`;
    this._params = [`port`];
    this._executor = executor;
  }

  execute(app, args) {
    const defaultPort = Config.DEFAULT_PORT;

    if (args.length > 0) {
      const specifiedPort = args[0];
      // Validates which port would be used
      const validPort = this.validateUserNumberParameter(specifiedPort, defaultPort);

      return this._executor(validPort);
    }

    return this._executor(defaultPort);
  }
}

module.exports = {ServerCommand};
