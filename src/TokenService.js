/**
 * @author Duncan Grubbs
 * @description Token parsing abstraction layer for dependency injection
 * @version 0.1.0
 */

class TokenService {
  static decode(token) {
    return token === null ? null : jwt.decode(token);
  }
}

module.exports = TokenService;
