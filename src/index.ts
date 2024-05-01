import {
  hydrateDates,
  handleErrors,
  logger,
  toJson,
} from './middleware/index.js'
import { Middleware } from './shared-types/middleware.type.js'
import { HttpApi } from './lib/http-api.service.js'
import Auth from './lib/auth.service.js'
import { AuthTypes } from './shared-types/auth-types.enum.js'
import { RestMethods } from './shared-types/rest-methods.enum.js'
import { logger as loggerUtil } from './utils/logger.js'

export {
  HttpApi,
  Auth,
  RestMethods,
  type Middleware,
  AuthTypes,
  hydrateDates,
  handleErrors,
  logger,
  toJson,
  loggerUtil,
}
