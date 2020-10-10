const API = require('../src/API');

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 400,
    json: () => Promise.resolve({ data: 'data', error: 'hello' }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('makes GET request and handles 400', () => {
  API.GET('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes POST request and handles 400', () => {
  API.POST('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});


test('makes PUT request and handles 400', () => {
  API.PUT('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes DELETE request and handles 400', () => {
  API.DELETE('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

