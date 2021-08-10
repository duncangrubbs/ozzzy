const Api = require('../src/ApiService');
const buildFetchWithStatus = require('./mocks/fetch');
const { VALID_URL } = require('./mocks/constants');

global.fetch = buildFetchWithStatus(400);

beforeEach(() => {
  fetch.mockClear();
});

test('makes GET request and handles 400', () => {
  Api
    .GET(VALID_URL)
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes POST request and handles 400', () => {
  Api
    .POST(VALID_URL)
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});


test('makes PUT request and handles 400', () => {
  Api
    .PUT(VALID_URL)
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes DELETE request and handles 400', () => {
  Api
    .DELETE(VALID_URL)
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

