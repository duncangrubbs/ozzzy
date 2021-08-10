const AuthService = require('../src/AuthService');
const buildJWTParser = require('./mocks/jwt');

beforeEach(() => {
  localStorage.clear();
  // jwt.mockClear();
});

test('checks if user is logged in', () => {
  const value = AuthService.loggedIn();
  
  expect(value).toBe(false);
});

test('validates user is not admin', () => {
  const value = AuthService.isAdmin();
  
  expect(value).toBe(false);
});

test('validates user is admin', () => {
  localStorage.setItem('token', 'ashfjskdfh');
  const value = AuthService.isAdmin();
  
  expect(value).toBe(true);
});

test('checks for unexpired token', () => {
  const value = AuthService.isTokenExpired(1234);
  
  expect(value).toBe(false);
});

// test('checks for expired token', () => {
//   const value = AuthService.isTokenExpired(1234);
  
//   expect(value).toBe(true);
// });

test('sets token', () => {
  const tokenValue = '12358742yshgk';
  AuthService.setToken(tokenValue);
  const value = localStorage.getItem('token');
  expect(value).not.toBe(null);
  expect(value).toBe(tokenValue);
});

test('retrives token when there is one', () => {
  localStorage.setItem('token', 'test');
  const value = AuthService.getToken();
  expect(value).not.toBe(null);
});

test('retrives token when there is not one', () => {
  const value = AuthService.getToken();
  expect(value).toBe(null);
});

test('logs out', () => {
  localStorage.setItem('token', 'test');
  localStorage.setItem('name', 'test');

  AuthService.logout();

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  expect(token).toBe(null);
  expect(name).toBe(null);
});

test('gets null profile', () => {
  const profile = AuthService.getProfile();
  expect(profile).toBe(null);
});

test('gets actual profile', () => {
  localStorage.setItem('token', 'something');
  const profile = AuthService.getProfile();
  expect(profile.exp).not.toBe(null);
  expect(profile.userInfo).not.toBe(null);
});
