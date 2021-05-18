'use strict';

const {Command} = require(`../../core/command`);
const {Config} = require(`../../assets/config`);

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

    // Get target mocks data count from specified command parameter. Single record by default
    const specifiedOffersCount = (args.length > 0) ? parseInt(args[0], 10) : defaultCountValue;
    // Validate on Not A Number after parseInt from string
    const offersCount = isNaN(specifiedOffersCount) ? defaultCountValue : Math.abs(specifiedOffersCount);

    // If user specified more than 1000 offers break execution with error code
    if (offersCount > 1000) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(Config.Codes.ERROR);
    }

    // Run command executor. It is dependency injection for hot swap to test generator, for example
    this._executor(offersCount);
  }
}

module.exports = {GenerateCommand};
