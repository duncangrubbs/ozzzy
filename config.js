/**
 * @author Duncan Grubbs
 * @description Middleware configuration options
 * @version 0.1.0
 */

const config = {
  storageProvider: localStorage, // could be redux, etc.
  tokenParser: null, // jwt-token, etc.
  BASE_API_URL: 'https://example.com/api',
  API_VERSION: 'v0', // optional parameter
};

export default config;
