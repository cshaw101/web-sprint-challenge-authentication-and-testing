const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('./model')




router.post('/register', async (req, res, next) => {   //:9000/api/auth/register
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
      const { username, password } = req.body;

      try {
        const existingUser = await Users.getByUsername(username);
      
        if (existingUser) {
          return res.status(400).json({ message: 'username taken' });
        }
      
        const newUser = await Users.add({ username, password });
      
        res.status(201).json({ id: newUser.id, username: newUser.username, password: newUser.password });
      } catch (error) {
        console.error('Error during registration:', error);
      
        res.status(500).json({ message: "username and password required" });
        next(error);
      }
});







router.post('/login', async (req, res, next) => { //:9000/api/auth/login
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
      const { username, password } = req.body;

      try {
        const user = await Users.getByUsername(username);
      
        if (!user || !bcrypt.compareSync(password, user.password)) {
          res.status(401).json({ message: 'Invalid Credentials' });
        } else {
          res.status(200).json({ message: `Welcome, ${user.username}` });
        }
      } catch (error) {
        console.error('Error during login:', error);
        next(error);
      }
      
});

module.exports = router;
/**
 * plan of attack
 * work on register endpoint first
 * work on middleware 
 * after middleware is tested and working. work on any other necessities for jwt to work 
 * work on endpoints testing (bare minimum test, bare minimum code to pass test, and then refactor)
 * work on sad paths first to flesh out error messages and such and then work on the happy path
 */


