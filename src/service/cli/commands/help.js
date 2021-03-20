'use strict';

const {Command} = require(`../core/command`);

// Default cli app command. Prints help text
class HelpCommand extends Command {
  constructor() {
    super();
    this._name = `help`;
    this._description = `печатает этот текст`;
  }

  execute(app) {
    this._commandPrefix = app.commandsRegister.prefix;
    this._registeredCommands = app.commandsRegister.commands;

    const helpContent = [
      this._getAppDescription(),
      this._getGuide(),
      this._getCommandsHelp()
    ];

    const helpText = helpContent.join(`\n`);
    console.info(helpText);
  }

  _getAppDescription() {
    return `Программа запускает http-сервер и формирует файл с данными для API.\n`;
  }

  _getGuide() {
    const guideTitle = `\tГайд:\n`;
    const guideText = `\tservice.js <command>\n`;

    return guideTitle + guideText;
  }

  _getCommandsHelp() {
    const commandsHelpTitle = `\tКоманды:\n`;
    const commandsHelpText = this._getCommandsHelpText();

    return commandsHelpTitle + commandsHelpText;
  }

  _getCommandsHelpText() {
    let maxUsageLength = 0;

    // Parse registered commands data to help text elements
    const commandsHelpElements = Array.from(this._registeredCommands, ([_, instance]) => {
      // Parse command params from array to string with format of <%paramName%>
      const commandParams = instance.params.map((param) => `<${param}>`).join(` `);
      // Forms first part of help message - usage string
      const usageString = `\t${this._commandPrefix}${instance.name} ${commandParams}`;

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
  }
}

module.exports = {HelpCommand};
