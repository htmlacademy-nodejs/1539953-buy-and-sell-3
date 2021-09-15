'use strict';

const {connectionCallbacks} = require(`../connection-callbacks`);
const DEFAULT_CALLBACK_ROUTE = `*`;

// By request url looking for callback and returns execution result of it
class CallbackDirector {
  // Invokes target callback and returns execution result
  static async invoke(url, req, res) {
    try {
      const targetCallback = CallbackDirector._getTargetCallback(url);
      return await targetCallback(req, res);
    } catch (error) {
      const defaultCallback = CallbackDirector._getDefaultCallback();
      return await defaultCallback(req, res);
    }
  }

  // Returns callback by url
  static _getTargetCallback(url) {
    if (connectionCallbacks.has(url)) {
      return connectionCallbacks.get(url);
    }
    return CallbackDirector._getDefaultCallback();
  }

  // Returns default callback
  static _getDefaultCallback() {
    return connectionCallbacks.get(DEFAULT_CALLBACK_ROUTE);
  }
}

module.exports = {CallbackDirector};
