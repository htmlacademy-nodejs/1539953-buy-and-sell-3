'use strict';

const {Config} = require(`../../assets/config`);
const {getRandomInt, shuffle, readFile, writeFile} = require(`../../assets/utils`);

// Returns record title
const getTitle = (titles) => {
  return titles[getRandomInt(0, titles.length - 1)];
};

// Returns record picture in format of itemXX.jpg
const getPicture = () => {
  const randomPictureNumber = getRandomInt(Config.PicturesRange.MIN, Config.PicturesRange.MAX);
  const pictureNumber = randomPictureNumber.toString().padStart(2, `0`);

  return `item${pictureNumber}.jpg`;
};

// Returns random count of description sentences for offer
const getDescription = (descriptionSentences) => {
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
const getCategories = (categories) => {
  const categoriesCount = getRandomInt(1, categories.length - 1);

  return categories.slice(0, categoriesCount);
};

// Returns generated offers data
const generateExecutor = async (count) => {
  const titles = await readFile(Config.Paths.TITLES);
  const descriptionSentences = await readFile(Config.Paths.SENTENCES);
  const categories = await readFile(Config.Paths.CATEGORIES);

  // Creates specified count of empty objects and fills it with data
  const data = Array(count).fill({}).map(() => {
    return {
      title: getTitle(titles),
      picture: getPicture(),
      description: getDescription(descriptionSentences),
      type: getType(),
      sum: getSum(),
      category: getCategories(categories)
    };
  });

  // Create JsonResult and write it to result file
  const jsonData = JSON.stringify(data);
  await writeFile(Config.FILE_NAME, jsonData);

  process.exit(Config.Codes.SUCCESS);
};

module.exports = {generateExecutor};
