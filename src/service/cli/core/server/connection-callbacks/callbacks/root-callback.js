'use strict';

const {getHtmlTitle, handleHtmlTemplate} = require(`../../html-tools`);
const {readFile} = require(`../../../../assets/utils`);
const {Config} = require(`../../../../assets/config`);
const {HttpCode} = require(`../../http-code`);

const TEMPLATE_NAME = `index`;

// Callback that runs on user request to root page
const rootCallback = async (req, res) => {
  const fileContent = await readFile({
    filePath: Config.FILE_NAME,
    useProjectRoot: true
  });

  if (fileContent.length) {
    // Forms html unordered list from post titles
    const mocks = JSON.parse(fileContent);

    const htmlTitle = getHtmlTitle();
    const titlesList = mocks.map((post) => `<li>${post.title}</li>`).join(``);
    const responseBody = await handleHtmlTemplate(TEMPLATE_NAME, {htmlTitle, titlesList});

    return {
      res,
      statusCode: HttpCode.OK,
      body: responseBody,
      headers: {
        'Content-Type': `text/html; charset=UTF-8`,
      }
    };
  }

  throw new Error(`Mocks data is empty or not exists`);
};

module.exports = {rootCallback};
