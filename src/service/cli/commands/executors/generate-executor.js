'use strict';

const {Config} = require(`../../assets/config`);
const {getRandomInt, shuffle} = require(`../../assets/utils`);
const {titles, descriptionSentences, categories} = require(`../../assets/contents.json`);
const fs = require(`fs`);

// Returns record title
const getTitle = () => {
  return titles[getRandomInt(0, titles.length - 1)];
};

// Returns record picture in format of itemXX.jpg
const getPicture = () => {
  const randomPictureNumber = getRandomInt(Config.PicturesRange.MIN, Config.PicturesRange.MAX);
  const pictureNumber = randomPictureNumber.toString().padStart(2, `0`);

  return `item${pictureNumber}.jpg`;
};

// Returns random count of description sentences for offer
const getDescription = () => {
  const sentencesCount = getRandomInt(Config.MIN_DESCRIPTION_LENGTH, Config.MAX_DESCRIPTION_LENGTH);
  const shuffledSentences = shuffle(descriptionSentences);

  return shuffledSentences.slice(0, sentencesCount).join(` `);
};

// Returns random offer type
const getType = () => {
  const types = Object.values(Config.OffersTypes);

  return types[getRandomInt(0, types.length - 1)];
};

// Returns random offer sum in range
const getSum = () => {
  return getRandomInt(Config.OfferCostRange.MIN, Config.OfferCostRange.MAX);
};

// Returns random offer categories array
const getCategories = () => {
  const categoriesCount = getRandomInt(1, categories.length - 1);

  return categories.slice(0, categoriesCount);
};

// Writes mocks data to json file
const writeContentToFile = (body) => {
  fs.writeFile(Config.FILE_NAME, body, (error) => {
    if (error) {
      console.error(`Can't write data to file...`);
      return process.exit(Config.Codes.ERROR);
    }

    console.info(`Operation success. File created.`);
    return process.exit(Config.Codes.SUCCESS);
  });
};

// Returns generated offers data
const generateExecutor = (count) => {
  // Creates specified count of empty objects and fills it with data
  const data = Array(count).fill({}).map(() => {
    return {
      title: getTitle(),
      picture: getPicture(),
      description: getDescription(),
      type: getType(),
      sum: getSum(),
      category: getCategories()
    };
  });

  // Create JsonResult and write it to result file
  const jsonData = JSON.stringify(data);
  writeContentToFile(jsonData);
};

module.exports = {generateExecutor};
