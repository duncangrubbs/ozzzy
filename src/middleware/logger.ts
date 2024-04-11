import { logger as loggerUtil } from '../utils/logger'

/**
 * Logs basic response information
 * @param response Incoming data from previous middleware or API
 * @param next Next middleware handler function
 * @returns Result of next middleware handler
 */
export async function logger(response: Response): Promise<any> {
  loggerUtil.info(response.status, response.statusText, response.url)
  return response
}
