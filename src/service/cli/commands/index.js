'use strict';

const {versionExecutor} = require(`./executors/version-executor`);
const {helpExecutor} = require(`./executors/help-executor`);
const {generateExecutor} = require(`./executors/generate-executor`);

const {VersionCommand} = require(`./classes/version`);
const {HelpCommand} = require(`./classes/help`);
const {GenerateCommand} = require(`./classes/generate`);

const Commands = [
  new VersionCommand(versionExecutor),
  new HelpCommand(helpExecutor),
  new GenerateCommand(generateExecutor)
];

module.exports = {Commands};
