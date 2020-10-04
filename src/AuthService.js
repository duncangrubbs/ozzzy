/**
 * @author Duncan Grubbs
 * @description Auth middleware between a REST API and a frontend client.
 * Stores and validates tokens, handles logging in and out.
 * @version 0.1.0
 */

class AuthService {
  /**
   * Checks if there is a (valid) user logged in on the site.
   * @returns {Boolean} Valid user logged in.
   */
  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken();
    if (token == null) {
      return false;
    }
    return !AuthService.isTokenExpired(token);
  }

  /**
   * Checks if there is a (admin) user logged in on the site.
   * This is used for the admin dashboard.
   * @returns {Boolean} Admin user logged in.
   */
  static isAdmin() {
    const token = AuthService.getToken();
    if (token == null) {
      return false;
    }
    if (AuthService.getProfile().userInfo.permissionType > 0) {
      return true;
    }
    return false;
  }

  /**
   * Checks if the logged in user's session is expired.
   * @param {String} token Token of logged in user.
   */
  static isTokenExpired(token, decode) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return true;
    }
  }

  /**
   * Adds or updates user token in local storage.
   * @param {String} idToken Token from API response.
   */
  static setToken(idToken) {
    // Saves user token to localStorage
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', idToken);
    }
  }

  /**
   * Gets token from local storage.
   * @returns {String} Token or null.
   */
  static getToken() {
    let token = localStorage.getItem('token');
    if (token != null) {
      token = token.replace(/"/g, '');
      return token;
    }
    return null;
  }

  /**
   * Logs out a user.
   */
  static logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload();
  }

  /**
   * Gets the profile information of a logged in user from the token.
   * @returns {Object} Profile
   */
  static getProfile(decode) {
    return decode(AuthService.getToken());
  }
}

module.exports = AuthService;
