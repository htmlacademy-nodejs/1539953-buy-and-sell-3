'use strict';

const {readFile} = require(`../../assets/utils`);

// HTML title separator
const TITLE_SEPARATOR = ` - `;
// Path to directory of html templates
const TEMPLATES_DIR_PATH = `/cli/core/server/pages`;
const TEMPLATE_EXTENSION = `.html`;

// Returns project name for html title
const getHtmlTitle = () => {
  return `Buy And Sell`;
};

// Returns project name extended with custom text
const getExtendedHtmlTitle = (text) => {
  const title = getHtmlTitle();
  return title + TITLE_SEPARATOR + text;
};

// Returns specified template as string
const getHtmlTemplate = async (templateName) => {
  const targetPath = TEMPLATES_DIR_PATH + `/` + templateName + TEMPLATE_EXTENSION;

  // Read html in compressed format
  const result = await readFile({
    filePath: targetPath,
    compressFile: true
  });

  return result.join(``);
};

// Returns handled html template
const handleHtmlTemplate = async (templateName, params) => {
  let template = await getHtmlTemplate(templateName);

  const openTag = `<`;
  const closeTag = ` />`;

  // For each received parameter
  for (let [key, value] of Object.entries(params)) {
    const targetTag = openTag + key + closeTag;
    const expression = new RegExp(targetTag, `g`);

    // Replace all matches in template
    template = template.replace(expression, value.toString());
  }

  return template;
};

module.exports = {getHtmlTitle, getExtendedHtmlTitle, handleHtmlTemplate};
