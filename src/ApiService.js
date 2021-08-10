/**
 * @author Duncan Grubbs
 * @description Middleware between a REST API and client HTML components
 * @version 0.1.1
 */

const AuthService = require('./AuthService');
const ErrorService = require('./ErrorService');
const { AUTH_HEADER_STRING, extractDataFromApiResponse } = require('./constants');

const HeadersWithAuth = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `${AUTH_HEADER_STRING} ${AuthService.getToken()}`,
};

const HeadersWithoutAuth = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Builds a formatted url with parameters
 * @param {String} baseUrl Base URL with no params attached
 * @param {Obbject} params Key-value pairs for URL parameters
 * @returns Full url with params embedded
 */
function buildUrlWithQueryParameters(baseUrl, params) {
  let fullUrl = baseUrl;
  Object.keys(params).forEach((key, index) => {
    if (index === 0) {
      fullUrl = `${fullUrl}?${params}=${params[key]}`;
    } else {
      fullUrl = `${fullUrl}&${params}=${params[key]}`;
    }
  });

  return fullUrl;
}

class Api {
  /**
   * Sends GET request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url API endpoint
   * @param {Boolean} authFlag Send Authorization Header
   * @param {Object} params Key-value pairs for URL parameters passed to the API
   */
  static GET(url, authFlag = true, params = {}) {
    const options = { method: 'GET' };
    const urlWithParams = buildUrlWithQueryParameters(url, params);

    return Api
      .fetch(
        urlWithParams,
        options,
        authFlag,
      )
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error));
  }

  /**
   * Sends POST request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url URL for the API request.
   * @param {Object} data Any data you want to pass to the API.
   * @param {Boolean} authFlag Send Authorization Header
   */
  static POST(url, data, authFlag = true) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ data }),
    };

    return Api
      .fetch(
        url,
        options,
        authFlag,
      )
      .then((blob) => Promise.resolve(blob))
      .catch((error) => Promise.reject(error));
  }

  /**
   * Sends PUT request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url API endpoint
   * @param {Object} data Any data you want to pass to the API.
   * @param {Boolean} authFlag Send Authorization Header
   */
  static PUT(url, data, authFlag = true) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ data }),
    };

    return Api
      .fetch(
        url,
        options,
        authFlag,
      )
      .then((blob) => Promise.resolve(blob))
      .catch((error) => Promise.reject(error));
  }

  /**
   * Sends DELETE request to and endpoint
   * Returns promise with parsed response or an HTML element for the error
   * @param {String} url API endpoint
   * @param {Boolean} authFlag Send Authorization Header
   */
  static DELETE(url, authFlag = true) {
    const options = { method: 'DELETE' };

    return Api
      .fetch(
        url,
        options,
        authFlag,
      )
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error));
  }

  /**
   * Converts all dates in string format to date objects within
   * a given object
   * @param data Object to convert string dates inside of
   * @returns Same input object but with string dates
   * converted to Date objects
   */
  static deserializeDates(data) {
    const dateFormat = /^-?\d+-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    function hydrator(key, value) {
      if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
      }

      return value;
    }

    const dataAsString = JSON.stringify(data);
    const hydratedData = JSON.parse(dataAsString, hydrator);

    return Promise.resolve(hydratedData);
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
      ? HeadersWithAuth
      : HeadersWithoutAuth;

    return fetch(url, {
      headers,
      ...options,
    })
      .then((res) => {
        if (!Api.checkStatus(res)) {
          return res
            .json()
            .then((blob) => Promise.reject(ErrorService.parseError(blob)));
        }
        return res
          .json()
          .then((blob) => Api.deserializeDates(extractDataFromApiResponse(blob)))
          .then((data) => Promise.resolve(data));
      });
  }

  /**
   * Checks the status code of a given response
   * @param {Object} response API response
   * @returns {Boolean} If the response code is ok, i.e.
   * (>=200, <300), not (> 300)
   */
  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  }
}

module.exports = Api;
