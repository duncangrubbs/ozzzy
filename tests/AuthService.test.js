const AuthService = require('../src/AuthService');

beforeEach(() => {
  localStorage.clear();
});

test('checks if user is logged in', () => {
  const value = AuthService.loggedIn();
  
  expect(value).toBe(false);
});

test('checks if user is admin', () => {
  const value = AuthService.isAdmin();
  
  expect(value).toBe(false);
});

test('checks if token is expired', () => {
  const value = AuthService.isTokenExpired(1234);
  
  expect(value).toBe(false);
});

test('sets token', () => {
  AuthService.setToken('12358742yshgk');
  const value = localStorage.getItem('token');
  expect(value).not.toBe(null);
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
