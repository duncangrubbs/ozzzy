import { hydrateDates } from '../../src/middleware/dates.middleware'

describe('hydrate dates middleware', () => {
  test('two plus two is four', async () => {
    const expectedResult = {
      foo: 'bar',
      example_date: new Date('2024-04-28T16:41:37.008Z'),
      nested_root: {
        foo: 'bar',
        nested_date: new Date('2023-04-28T16:41:37.008Z'),
      },
    }

    const actualResult = await hydrateDates({
      foo: 'bar',
      example_date: '2024-04-28T16:41:37.008Z',
      nested_root: {
        foo: 'bar',
        nested_date: '2023-04-28T16:41:37.008Z',
      },
    })

    expect(actualResult).toEqual(expectedResult)
  })
})
