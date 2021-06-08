'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const {connectionCallbacks} = require(`../../core/server/connection-callbacks`);

// Get default callback for errors cases
const defaultCallback = connectionCallbacks.get(`*`);

// Returns html file with specified status code
const sendResponse = ({res, statusCode, headers, body}) => {
  res.writeHead(statusCode, headers);
  res.end(body);
};

// Callback on client connection
const onClientConnect = async (req, res) => {
  try {
    const requestUrl = req.url;

    // If requested url is being supported by app
    if (connectionCallbacks.has(requestUrl)) {
      const targetCallback = connectionCallbacks.get(requestUrl);
      const responseObject = await targetCallback(req, res);

      return sendResponse(responseObject);
    }

    const defaultResponseObject = await defaultCallback(req, res);
    return sendResponse(defaultResponseObject);
  } catch (error) {
    const defaultResponseObject = await defaultCallback(req, res);

    return sendResponse(defaultResponseObject);
  }
};

// Returns instance of http server running on specified port
const serverExecutor = (port) => {
  const server = http.createServer(onClientConnect);

  server
    .listen(port)
    .on(`listening`, () => {
      console.info(chalk.green(`Listening requests on port: ${port}`));
    })
    .on(`error`, ({message}) => {
      console.error(chalk.red(`Error on creating of server: ${message}`));
    });

  return server;
};

module.exports = {serverExecutor};
