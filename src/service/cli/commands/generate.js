'use strict';

const {Command} = require(`../core/command`);
const {Config} = require(`../assets/config`);
const {getRandomInt, shuffle} = require(`../assets/utils`);
const {titles, descriptionSentences, categories} = require(`../assets/contents.json`);
const fs = require(`fs`);

const Codes = {
  ERROR: 1,
  SUCCESS: 0
};

// Main cli app command that generates mocks data
class GenerateCommand extends Command {
  constructor() {
    super();
    this._name = `generate`;
    this._description = `формирует файл mocks.json`;
    this._params = [`count`];
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
      process.exit(Codes.ERROR);
    }

    const contentBody = this._generateOffers(offersCount);
    this._writeContentToFile(contentBody);
  }

  // Returns generated offers data
  _generateOffers(count) {
    // Creates specified count of empty objects and fills it with data
    const data = Array(count).fill({}).map(() => {
      return {
        title: this._getTitle(),
        picture: this._getPicture(),
        description: this._getDescription(),
        type: this._getType(),
        sum: this._getSum(),
        category: this._getCategories()
      };
    });

    // Returns JsonResult
    return JSON.stringify(data);
  }

  // Returns record title
  _getTitle() {
    return titles[getRandomInt(0, titles.length - 1)];
  }

  // Returns record picture in format of itemXX.jpg
  _getPicture() {
    const randomPictureNumber = getRandomInt(Config.PicturesRange.MIN, Config.PicturesRange.MAX);
    const pictureNumber = randomPictureNumber.toString().padStart(2, `0`);

    return `item${pictureNumber}.jpg`;
  }

  // Returns random count of description sentences for offer
  _getDescription() {
    const sentencesCount = getRandomInt(Config.MIN_DESCRIPTION_LENGTH, Config.MAX_DESCRIPTION_LENGTH);
    const shuffledSentences = shuffle(descriptionSentences);

    return shuffledSentences.slice(0, sentencesCount).join(` `);
  }

  // Returns random offer type
  _getType() {
    const types = Object.values(Config.OffersTypes);

    return types[getRandomInt(0, types.length - 1)];
  }

  // Returns random offer sum in range
  _getSum() {
    return getRandomInt(Config.OfferCostRange.MIN, Config.OfferCostRange.MAX);
  }

  // Returns random offer categories array
  _getCategories() {
    const categoriesCount = getRandomInt(1, categories.length - 1);

    return categories.slice(0, categoriesCount);
  }

  // Writes mocks data to json file
  _writeContentToFile(body) {
    fs.writeFile(Config.FILE_NAME, body, (error) => {
      if (error) {
        console.error(`Can't write data to file...`);
        return process.exit(Codes.ERROR);
      }

      console.info(`Operation success. File created.`);
      return process.exit(Codes.SUCCESS);
    });
  }
}

module.exports = {GenerateCommand};
