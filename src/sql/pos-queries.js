const db = require('../db/db.js');

const insertPos = (data, trx) => {
  const knex = trx || db;
  return knex('pos').insert(data);
};

const setUser = (data, trx) => {
  const knex = trx || db;
  return knex('userPos').insert(data);
};

module.exports = {
  insertPos,
  setUser
};
