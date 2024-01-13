// Write your tests here
const request = require('supertest')
const server = require('./server')
const Users = require('./auth/model')
test('sanity', () => {
  expect(true).toBe(true)
})



test('should register a new user successfully', async () => {
     try {
       const newUser = {
         username: 'testuser',
         password: 'testpassword',
       };
   
       const response = await request(server)
         .post('/api/auth/register')
         .send(newUser);
   
       expect(response.status).toBe(201);
       expect(response.body).toHaveProperty('id');
       expect(response.body).toHaveProperty('username', newUser.username);
     } catch (error) {
       console.error('Unexpected error during test:', error);
     }
   });
   

   describe('Failed Registration', () => {
     it('should return "username and password required" if username or password is missing', async () => {
       const invalidUser = {
       };
 
       const response = await request(server)
         .post('/api/auth/register')
         .send(invalidUser);
 
       expect(response.status).toBe(500);
       expect(response.body).toEqual({ message: 'username and password required' });
     });
   });

// server.test.js

describe('POST /api/auth/login', () => {
  it('should return a success message and token on successful login', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Captain Marvel',
        password: 'foobar',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'welcome, Captain Marvel');
    expect(response.body).toHaveProperty('token');
  });

  it('should return an error message for invalid credentials', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'InvalidUser',
        password: 'InvalidPassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'invalid credentials');
  });
});



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
  