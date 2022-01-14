/**
 * Logs basic response information
 * @param response Incoming data from previous middleware or API
 * @param next Next middleware handler function
 * @returns Result of next middleware handler
 */
export function logger(response: Response, next: any): Promise<any> {
  console.log(response.status, response.statusText, response.url);
  return next(response);
}
