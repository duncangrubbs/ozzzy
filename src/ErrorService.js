/**
 * @author Duncan Grubbs
 * @description Error handling middleware between a REST API and a frontend client
 * Parses API errors and returns HTML components
 * @version 0.1.0
 */

const Error = require('./Error');

class ErrorService {
  /**
   * Parses an error and returns an HTML component
   * with the error embedded
   * @param {Object} data JSON response from API
   * @returns {Object} HTML Element
   */
  static parseError(data) {
    return data.error ? new Error(data.error) : null;
  }
}

module.exports = ErrorService;
