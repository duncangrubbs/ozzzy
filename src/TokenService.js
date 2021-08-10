/**
 * @author Duncan Grubbs
 * @description Token parsing abstraction layer for dependency injection
 * @version 0.1.1
 */

const { tokenParser } = require('./constants');

class TokenService {
  /**
   * Parses a token string with the chosen parsing library (JWT, etc.)
   * @param {String} token Token string to be parsed
   */
  static decode(token) {
    return token === null ? null : tokenParser.decode(token);
  }
}

module.exports = TokenService;
