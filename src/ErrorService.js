/**
 * @file ErrorService.js
 * @description Interprets errors from API.
 * @author Duncan Grubbs
 * @version 0.1.0
 */

export default class ErrorService {
  /**
   * Decides what to do with error.
   * @param {Object} data Response from server
   */
  static parseError(data) {
    if (data.error) { return data.error; }
    return null;
  }
}