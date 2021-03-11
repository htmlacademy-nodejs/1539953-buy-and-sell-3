'use strict';

const {
  OfferCost,
  OffersCount,
  OfferType,
  MAX_DESCRIPTION_LENGTH,
  FILE_NAME
} = require(`../generation-config`);
const {getRandomInt, shuffle} = require(`../utils`);
const contents = require(`../contents.json`);
const fs = require(`fs`);

module.exports = {
  name: `--generate`,
  run(args) {
    const getTitle = () => {
      const titles = contents.titles;

      return (
        titles[
                    getRandomInt(0, titles.length - 1)
        ]
      );
    };

    const getPicture = () => {
      const PicturesRange = {
        MIN: 1,
        MAX: 16
      };

      const pictureNumber = (
        getRandomInt(PicturesRange.MIN, PicturesRange.MAX)
                    .toString()
                    .padStart(2, `0`)
      );

      return `item${pictureNumber}.jpg`;
    };

    const getDescription = () => {
      return (
        shuffle(contents.descriptionSentences)
                    .slice(0, MAX_DESCRIPTION_LENGTH)
                    .join(` `)
      );
    };

    const getType = () => {
      const types = Object.values(OfferType);

      return (
        types[
                    getRandomInt(0, types.length - 1)
        ]
      );
    };

    const getSum = () => {
      return (
        getRandomInt(OfferCost.MIN, OfferCost.MAX)
      );
    };

    const getCategories = () => {
      const categories = contents.categories;

      return (
        categories.slice(0, getRandomInt(1, categories.length - 1))
      );
    };

    const generateOffers = (count) => {
      return (
        Array(count)
                    .fill({})
                    .map(() => ({
                      title: getTitle(),
                      picture: getPicture(),
                      description: getDescription(),
                      type: getType(),
                      sum: getSum(),
                      category: getCategories()
                    }))
      );
    };

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || OffersCount.DEFAULT;

    // If user specified more than 1000 offers break execution with error code
    if (countOffer > 1000) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(1);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (error) => {
      if (error) {
        console.error(`Can't write data to file...`);
        return process.exit(1);
      }

      console.info(`Operation success. File created.`);
      return process.exit(0);
    });
  }
};
