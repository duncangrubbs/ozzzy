import { logger as loggerUtil } from '../utils/logger.js'

/**
 * Logs basic response information
 * @param response Incoming data from previous middleware or API
 * @returns The response
 */
export async function logger(response: Response): Promise<Response> {
  loggerUtil.info(response.status, response.statusText, response.url)
  return response
}
