/**
 * @author Duncan Grubbs
 * @description Middleware between a REST API and client HTML components
 * @version 0.1.0
 */

import AuthService from './AuthService';
import ErrorService from './ErrorService';

export default class FetchService {
  /**
   * Sends GET request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url API endpoint
   * @param {Boolean} authFlag Send Authorization Headder
   */
  static GET(url, authFlag = true) {
    const options = {
      method: 'GET',
    };

    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Sends POST request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the API.
   * @param {Boolean} authFlag Send Authorization header?
   */
  static POST(url, data, authFlag = true) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ data }),
    };

    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Sends PUT request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url API endpoint
   * @param {Object} data Any data you want to pass to the API.
   * @param {Boolean} authFlag Send Authorization header?
   */
  static PUT(url, data, authFlag = true) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ data }),
    };

    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Sends DELETE request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url API endpoint
   * @param {Boolean} authFlag Send Authorization header?
   */
  static DELETE(url, authFlag = true) {
    const options = {
      method: 'DELETE',
    };

    return FetchService.fetch(
      url,
      options,
      authFlag,
    )
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  /**
   * Generic fetch method
   * Automatically validates responses, etc.
   * @param {String} url API endpoint
   * @param {Object} options HTTP header options
   * @param {Boolean} authFlag Send Authorization header to API
   */
  static fetch(url, options, authFlag) {
    const headers = authFlag
      ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthService.getToken()}`,
      }
      : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

    return fetch(url, {
      headers,
      ...options,
    })
      .then((res) => {
        if (!FetchService._checkStatus(res)) {
          return res.json()
            .then(blob => Promise.reject(ErrorService.parseError(blob)));
        }
        return res.json().then(blob => Promise.resolve(blob.data));
      });
  }

  /**
   * Checks the status code of a given response
   * @param {Object} response API response
   * @returns {Boolean} If the response code is ok, i.e.
   * (>=200, <300), not (> 300)
   */
  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  }
}