const API = require('../src/API');

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ data: 'data', error: 'hello' }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('makes GET request and handles 200', () => {
  API.GET('https://www.w.com')
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes POST request and handles 200', () => {
  API.POST('https://www.w.com')
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});


test('makes PUT request and handles 200', () => {
  API.PUT('https://www.w.com')
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes DELETE request and handles 200', () => {
  API.DELETE('https://www.w.com')
    .then((data) => {
      expect(data).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

