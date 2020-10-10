const Error = require('../src/Error');

test('returns HTML element when provided message', () => {
  expect(Error('my message')).not.toBe(null);
});
