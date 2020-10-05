global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'data', error: 'hello' }),
  })
);