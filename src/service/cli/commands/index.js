'use strict';

const {versionExecutor} = require(`./executors/version-executor`);
const {helpExecutor} = require(`./executors/help-executor`);
const {generateExecutor} = require(`./executors/generate-executor`);
const {serverExecutor} = require(`./executors/server-executor`);

const {VersionCommand} = require(`./classes/version`);
const {HelpCommand} = require(`./classes/help`);
const {GenerateCommand} = require(`./classes/generate`);
const {ServerCommand} = require(`./classes/server`);

const Commands = [
  new VersionCommand(versionExecutor),
  new HelpCommand(helpExecutor),
  new GenerateCommand(generateExecutor),
  new ServerCommand(serverExecutor)
];

module.exports = {Commands};
