function buildJWTParser(isExpired, isAdmin) {
  return class ExpiredParser {
    static decode(token) {
      return {
        exp: (Date.now() / 1000) - (isExpired ? 1000 : 0),
        userInfo: {
          permissionType: isAdmin ? 1 : 0,
        }
      };
    }
  }
}

module.exports = buildJWTParser;
