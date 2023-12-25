const db = require('../../data/dbConfig')
const bcrypt = require('bcrypt')

async function add(user) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    const [id] = await db('users').insert({
      username: user.username,
      password: hashedPassword,
    });
    const insertedUser = await db('users')
      .select('id', 'username', 'password')
      .where('id', id)
      .first();
  
    return insertedUser;
}

function findByUsername(username) {
//make a function that looks into the database and checks to see if the username provided is already in the database or not
}

module.exports = {
    add,
    findByUsername
}