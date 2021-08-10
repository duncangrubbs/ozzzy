// factory for mock fetch functions

const buildFetchWithStatus = (status) => jest.fn(() =>
  Promise.resolve({
    status,
    json: () => Promise.resolve({ data: 'data', error: 'hello' }),
  })
);

module.exports = buildFetchWithStatus;
