import { checkStatus } from './middleware/error-handler';
import { toJson } from './middleware/json';
import { logger } from './middleware/logger';
import { Api, Auth, hydrateDates } from './ozzy';

const baseUrl = 'https://jsonplaceholder.typicode.com';

type ApiResponse = {
  userId: object;
  id: string;
  title: string;
  completed: boolean;
};

const api = new Api(
  baseUrl,
  new Auth(),
  [],

  /*
  You can apply your middleware here.
  */
  logger,
  checkStatus,
);

/**
 * You can build URLs with query params
 */
console.log(api.buildUrl('/todos', { completed: 'false' }).href);

/* 
You can also apply middleware using the .use() function, similar
to Express.js
*/
api.use(toJson);
api.use(hydrateDates);

function sampleMiddleware(data: any, next: any) {
  console.log('[dummy middleware]');
  return next(data);
}

async function run() {
  /*
  You can also apply middleware at the request level for more specific
  data modifications you need
  */
  const data = await api.get<ApiResponse>(
    api.buildUrl('/todos/1'),
    sampleMiddleware,
  );
  console.log(data);

  try {
    await api.get(api.buildUrl('/todos/sadfsf/sdgsdg'), sampleMiddleware);
  } catch (error) {
    // you can handle the error here
  }
}

run();
