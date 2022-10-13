import { checkStatus } from "./middleware/error-handler";
import { toJson } from "./middleware/json";
import { logger } from "./middleware/logger";
import { Api, Auth, hydrateDates } from "./ozzy";

const baseUrl = "https://jsonplaceholder.typicode.com";

type ApiResponse = {
  userId: object;
  id: string;
  title: string;
  completed: boolean;
};

const api = new Api<ApiResponse>(
  baseUrl,
  new Auth(),
  [],

  /*
  You can apply your middleware here.
  */
  logger,
  checkStatus
);

/* 
You can also apply middleware using the .use() function, similar
to Express.js
*/
api.use(toJson);
api.use(hydrateDates);

function sampleMiddleware(data: any, next: any) {
  console.log("[dummy middleware]");
  return next(data);
}

async function run() {
  /*
  You can also apply middleware at the request level for more specific
  data modifications you need
  */
  const data = await api.get("/todos/1", sampleMiddleware);
  console.log(data);

  try {
    await api.get("/todos/sadfsf/sdgsdg", sampleMiddleware);
  } catch (error) {
    console.log(error);
  }
}

run();
