/**
 * @author Duncan Grubbs
 * @description Error handling middleware between a REST API and a frontend client
 * Parses API errors and returns HTML components
 * @version 0.1.0
 */

export default class ErrorService {
  /**
   * Parses an error and returns an HTML component
   * with the error embedded
   * @param {Object} data JSON response from API
   * @returns {Object} HTML Element
   */
  static parseError(data) {
    if (data.error) { return data.error; }
    return null;
  }
}