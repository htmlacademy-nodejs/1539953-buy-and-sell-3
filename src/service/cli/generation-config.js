'use strict';

module.exports = {
  FILE_NAME: `mocks.json`,
  OfferCost: {
    MIN: 1000,
    MAX: 100000
  },
  // Range of elements count in result file
  OffersCount: {
    DEFAULT: 1,
    MIN: 1,
    MAX: 1000
  },
  OfferType: {
    OFFER: `offer`,
    SALE: `sale`,
  },
  // Max count of sentences in description
  MAX_DESCRIPTION_LENGTH: 5
};
