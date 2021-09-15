'use strict';

const {Command} = require(`../../core/command`);
const {Config} = require(`../../assets/config`);
const chalk = require(`chalk`);

// Main cli app command that generates mocks data
class GenerateCommand extends Command {
  constructor(executor) {
    super();

    this._name = `generate`;
    this._description = `формирует файл mocks.json`;
    this._params = [`count`];
    this._executor = executor;
  }

  execute(app, args) {
    const defaultCountValue = Config.OffersCount.DEFAULT;

    if (args.length > 0) {
      const specifiedOffersCount = args[0];
      const validOffersCount = this.validateUserNumberParameter(specifiedOffersCount, defaultCountValue);

      // If user specified more than 1000 offers break execution with error code
      if (validOffersCount > 1000) {
        console.error(chalk.red(`Не больше 1000 объявлений`));
        process.exit(Config.Codes.ERROR);
      }

      return this._executor(validOffersCount);
    }

    return this._executor(defaultCountValue);
  }
}

module.exports = {GenerateCommand};
