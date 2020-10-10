const FetchService = require('../src/FetchService');

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
  FetchService.GET('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes POST request and handles 400', () => {
  FetchService.POST('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});


test('makes PUT request and handles 400', () => {
  FetchService.PUT('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('makes DELETE request and handles 400', () => {
  FetchService.DELETE('https://www.w.com')
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});

