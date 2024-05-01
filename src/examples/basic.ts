import {
  Api,
  hydrateDates,
  checkStatus,
  toJson,
  logger,
  loggerUtil,
} from '../index.js'

const baseUrl = 'https://jsonplaceholder.typicode.com'

type ApiResponse = {
  userId: object
  id: string
  title: string
  completed: boolean
}

const api = new Api(
  baseUrl,
  undefined,
  [],

  /*
  You can apply your middleware here.
  */
  logger,
  checkStatus,
)

/**
 * You can build URLs with query params
 */
loggerUtil.debug('custom url with query params:')
loggerUtil.debug(api.buildUrl('/todos', { completed: 'false' }).href, '\n')

/* 
You can also apply middleware using the .use() function, similar
to Express.js
*/
api.use(toJson)
api.use(hydrateDates)

async function sampleMiddleware(data: ApiResponse) {
  return data
}

async function run() {
  /*
  You can also apply middleware at the request level for more specific
  data modifications you need
  */
  loggerUtil.debug('request 1')
  const data = await api.get<ApiResponse>(
    api.buildUrl('/todos/1'),
    sampleMiddleware,
  )
  loggerUtil.debug('response:', data, '\n')

  loggerUtil.debug('request 2')
  try {
    await api.get(api.buildUrl('/todos/sadfsf'), sampleMiddleware)
  } catch (error) {
    console.error(error)
  }
}

run()
