'use strict';

const {VersionCommand} = require(`./version`);
const {HelpCommand} = require(`./help`);
const {GenerateCommand} = require(`./generate`);

const Commands = [
  new VersionCommand(),
  new HelpCommand(),
  new GenerateCommand()
];

module.exports = {Commands};
