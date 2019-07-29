#!/usr/bin/env node

if (process.env.NODE_ENV === 'production') {
  console.error('Production env error');
  process.exit(1);
}

const knex = require('../db/db.js');

const resetDB = async () => {
  try {
    await knex('gameSession').del();
    await knex('userAdmin').del();
    await knex('userPos').del();
    await knex('pos').del();
    await knex('user').del();

    await knex('user').insert({
      username: 'javier',
      password: '$2a$10$6D1Vvhojd/m3r0tNDERVpeHC4YcyigE0WaP1GrwG1v7TJjE2Bq7w6', //bcrypt(password)
      balance: 100000,
      date: '2019-07-12T19:53:26.000Z',
      permission: 0
    });

    knex.destroy();
  } catch (err) {
    console.error(err);
  }
};

resetDB();
