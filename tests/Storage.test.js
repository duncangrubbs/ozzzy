const Storage = require('../src/Storage');
const localStorage = require('./mocks/localStorage');

test('storage works with localStorage mock provider', () => {
  const st = new Storage(localStorage);
});

const st = new Storage(localStorage);
it('sets item', () => {
  st.setItem('key', 'value');
});

it('gets item', () => {
  st.setItem('key');
});

it('removes item', () => {
  st.setItem('key');
});
