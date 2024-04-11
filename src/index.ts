import { hydrateDates, checkStatus, logger, toJson } from './middleware/index'
import { Middleware } from './shared-types/middleware.type'
import Api from './lib/api.service'
import Auth from './lib/auth.service'
import AuthTypes from './shared-types/auth-types.enum'
import RestMethods from './shared-types/rest-methods.enum'
import { logger as loggerUtil } from './utils/logger'

export {
  Api as ozzy,
  Auth,
  RestMethods,
  type Middleware,
  AuthTypes,
  hydrateDates,
  checkStatus,
  logger,
  toJson,
  loggerUtil,
}
