'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const {CallbackDirector} = require(`../../core/server/classes/CallbackDirector`);

// Returns html file with specified status code
const sendResponse = ({res, statusCode, headers, body}) => {
  res.writeHead(statusCode, headers);
  res.end(body);
};

// Callback on client connection
const onClientConnect = async (req, res) => {
  const requestUrl = req.url;
  const responseObject = await CallbackDirector.invoke(requestUrl, req, res);

  return sendResponse(responseObject);
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
