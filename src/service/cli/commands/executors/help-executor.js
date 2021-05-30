'use strict';

const chalk = require(`chalk`);

const getAppDescription = () => {
  return `Программа запускает http-сервер и формирует файл с данными для API.\n`;
};

const getGuide = () => {
  const guideTitle = `\tГайд:\n`;
  const guideText = `\tservice.js <command>\n`;

  return guideTitle + guideText;
};

const getCommandsHelp = (commandPrefix, registeredCommands) => {
  const commandsHelpTitle = `\tКоманды:\n`;
  const commandsHelpText = getCommandsHelpText(commandPrefix, registeredCommands);

  return commandsHelpTitle + commandsHelpText;
};

const getCommandsHelpText = (commandPrefix, registeredCommands) => {
  let maxUsageLength = 0;

  // Parse registered commands data to help text elements
  const commandsHelpElements = Array.from(registeredCommands, ([_, instance]) => {
    // Parse command params from array to string with format of <%paramName%>
    const commandParams = instance.params.map((param) => `<${param}>`).join(` `);
    // Forms first part of help message - usage string
    const usageString = `\t${commandPrefix}${instance.name} ${commandParams}`;

    // Along the way get longest usage string
    if (usageString.length > maxUsageLength) {
      maxUsageLength = usageString.length;
    }

    return {
      usage: usageString,
      description: instance.description
    };
  });

  return commandsHelpElements.map((element) => {
    const SPACES_COUNT = 2;
    // Add spaces to the longest usage string with additional space
    const formattedUsage = element.usage.padEnd(maxUsageLength + SPACES_COUNT, ` `);

    return formattedUsage + element.description;
  }).join(`\n`);
};

const helpExecutor = (commandPrefix, registeredCommands) => {
  const helpContent = [
    getAppDescription(),
    getGuide(),
    getCommandsHelp(commandPrefix, registeredCommands)
  ];

  const helpText = helpContent.join(`\n`);
  console.info(chalk.gray(helpText));
};

module.exports = {helpExecutor};
