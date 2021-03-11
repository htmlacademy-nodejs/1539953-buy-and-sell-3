'use strict';

const help = require(`./commands/help`);
const generate = require(`./commands/generate`);
const version = require(`./commands/version`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
};

module.exports = {Cli};
