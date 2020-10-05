/**
 * @author Duncan Grubbs
 * @description Middleware configuration options
 * @version 0.1.0
 */

const storageProvider = localStorage;
const tokenParser = null;
const BASE_API_URL = 'https://example.com/api';
const API_VERSION = 'v0';

module.exports = {
  storageProvider,
  tokenParser,
  BASE_API_URL,
  API_VERSION,
};
