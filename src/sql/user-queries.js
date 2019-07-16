const db = require('../db/db.js');

const getUserData = (username, trx) => {
  const knex = trx || db;
  return knex
    .select('rowid', 'password', 'permission')
    .from('user')
    .where({ username });
};

const createUser = (data, trx) => {
  const knex = trx || db;
  return knex('user').insert(data);
};

const setAdmin = (data, trx) => {
  const knex = trx || db;
  return knex('userAdmin').insert(data);
};

module.exports = {
  createUser,
  getUserData,
  setAdmin
};
