'use strict';

const {rootCallback} = require(`./callbacks/root-callback`);
const {stylesCallback} = require(`./callbacks/styles-callback`);
const {defaultCallback} = require(`./callbacks/default-callback`);

const connectionCallbacks = new Map([
  [`/`, rootCallback],
  [`/style.css`, stylesCallback],
  [`*`, defaultCallback]
]);

module.exports = {connectionCallbacks};
