/**
 * @author Duncan Grubbs
 * @description Middleware configuration options
 * @version 0.1.1
 */

const storageProvider = localStorage;
const tokenParser = jwt; // eslint-disable-line
const BASE_API_URL = 'https://example.com/api';
const API_VERSION = 'v0';
const AUTH_HEADER_STRING = 'Bearer';

// where is the raw data stored when coming back from our api?
const extractDataFromApiResponse = (response) => response.data;

module.exports = {
  storageProvider,
  tokenParser,
  BASE_API_URL,
  API_VERSION,
  AUTH_HEADER_STRING,
  extractDataFromApiResponse,
};
