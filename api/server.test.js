// Write your tests here
const request = require('supertest')
const server = require('./server')
test('sanity', () => {
  expect(true).toBe(true)
})












//test ideas for register endpoint
/**
 *  username and password is posted in the users table on successful register
 * a username and password is provided
 * the username must not already exist in the users table
 * the password is hashed before saving
 * on successful registration the response body should have `id`, `username` and `password`
 * On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".
 * On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
 */

//test ideas for login endpoint
/**
 * login is successful with 200 when working
 * the response body should have `message` and `token` when request goes through successfully
 *  On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".
 *  On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
 */
  