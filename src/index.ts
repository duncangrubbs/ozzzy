import {
  hydrateDates,
  checkStatus,
  logger,
  toJson,
} from './middleware/index.js'
import { Middleware } from './shared-types/middleware.type.js'
import Api from './lib/api.service.js'
import Auth from './lib/auth.service.js'
import AuthTypes from './shared-types/auth-types.enum.js'
import RestMethods from './shared-types/rest-methods.enum.js'
import { logger as loggerUtil } from './utils/logger.js'

export {
  Api,
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
