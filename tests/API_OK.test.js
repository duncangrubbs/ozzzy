const Api = require('../src/ApiService');
const buildFetchWithStatus = require('./mocks/fetch');
const { VALID_URL } = require('./mocks/constants');

global.fetch = buildFetchWithStatus(200);

beforeEach(() => {
  fetch.mockClear();
});

test('makes GET request and handles 200', () => {
  Api
    .GET(VALID_URL)
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes POST request and handles 200', () => {
  Api
    .POST(VALID_URL)
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});


test('makes PUT request and handles 200', () => {
  Api
    .PUT(VALID_URL)
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes DELETE request and handles 200', () => {
  Api
    .DELETE(VALID_URL)
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

