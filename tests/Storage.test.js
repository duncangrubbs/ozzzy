const Storage = require('../src/Storage');

it('sets item', () => {
  Storage.setItem('key', 'value');
});

it('gets item', () => {
  Storage.setItem('key');
});

it('removes item', () => {
  Storage.setItem('key');
});
