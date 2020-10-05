const FetchService = require('../src/FetchService');

test('makes GET request', () => {
  FetchService.GET('https://www.w.com')
    .then((data) => {})
    .catch((error) => {
      expect(error).not.toBe(null);
    })
  
  expect(fetch).toHaveBeenCalledTimes(1);
});
