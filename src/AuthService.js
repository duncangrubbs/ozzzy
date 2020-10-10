/**
 * @author Duncan Grubbs
 * @description Auth middleware between a REST API and a frontend client
 * Stores and validates tokens, handles logging in and out
 * @version 0.1.0
 */

const Storage = require('./Storage');
const TokenService = require('./TokenService');

class AuthService {
  /**
   * Checks if there is a (valid) user logged in on the site.
   * @returns {Boolean} Valid user logged in.
   */
  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken();
    return !AuthService.isTokenExpired(token);
  }

  /**
   * Checks if there is a (admin) user logged in on the site.
   * @returns {Boolean} Admin user logged in.
   */
  static isAdmin() {
    const profile = AuthService.getProfile();
    if (profile !== null) {
      if (profile.userInfo.permissionType > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if the logged in user's session is expired.
   * @param {String} token Token of logged in user.
   */
  static isTokenExpired(token) {
    try {
      const decoded = TokenService.decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  }

  /**
   * Adds or updates user token in storage.
   * @param {String} token Token from API response.
   */
  static setToken(token) {
    if (!Storage.getItem('token')) {
      Storage.setItem('token', token);
    }
  }

  /**
   * Gets token from storage.
   * @returns {String} Token or null.
   */
  static getToken() {
    const token = Storage.getItem('token');
    return token === null ? null : token.replace(/"/g, '');
  }

  /**
   * Logs out a user.
   */
  static logout() {
    // Clear user token and profile data from storage
    Storage.removeItem('token');
    Storage.removeItem('name');
  }

  /**
   * Gets the profile information of a logged in user from the token.
   * @returns {Object} Profile
   */
  static getProfile() {
    return TokenService.decode(AuthService.getToken());
  }
}

module.exports = AuthService;
