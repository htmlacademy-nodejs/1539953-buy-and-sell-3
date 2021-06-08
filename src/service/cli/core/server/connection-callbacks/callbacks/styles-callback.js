'use strict';

const {readFile} = require(`../../../../assets/utils`);
const {HttpCode} = require(`../../http-code`);

// Path to styles files from cli app root
const STYLES_PATH = `/cli/core/server/styles/style.css`;

// Callback that runs on user request to styles file
const stylesCallback = async (req, res) => {
  const fileContent = await readFile({
    filePath: STYLES_PATH,
    compressFile: true
  });
  const styles = fileContent.join(``);

  return {
    res,
    statusCode: HttpCode.OK,
    body: styles,
    headers: {
      'Content-Type': `text/css; charset=UTF-8`,
    }
  };
};

module.exports = {stylesCallback};
