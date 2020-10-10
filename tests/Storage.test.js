const Storage = require('../src/Storage');

beforeEach(() => {
  localStorage.clear();
});

it('sets item', () => {
  Storage.setItem('key', 'value');
  const item = localStorage.getItem('key');
  expect(item).not.toBe(null);
});

it('gets item', () => {
  const item = Storage.getItem('key');
  expect(item).toBe(null);
});

it('removes item', () => {
  localStorage.setItem('key', 'value');
  Storage.removeItem('key');
  const item = localStorage.getItem('key');
  expect(item).toBe(null);
});
