'use strict';

const {getExtendedHtmlTitle, handleHtmlTemplate} = require(`../../html-tools`);
const {HttpCode} = require(`../../http-code`);

const TEMPLATE_NAME = `404`;

// Returns content for Not Found Page
const getNotFoundContent = async () => {
  const errorCode = HttpCode.NOT_FOUND;
  const errorText = `Not Found`;
  const htmlTitle = getExtendedHtmlTitle(errorText);

  return await handleHtmlTemplate(TEMPLATE_NAME, {htmlTitle, errorCode, errorText});
};

// Callback that runs on error or on request to not existing resource
const defaultCallback = async (req, res) => {
  const notFoundContent = await getNotFoundContent();

  return {
    res,
    statusCode: HttpCode.NOT_FOUND,
    body: notFoundContent,
    headers: {
      'Content-Type': `text/html; charset=UTF-8`,
    }
  };
};

module.exports = {defaultCallback};
