const db = require('../db/db.js');

const insertGameSession = (data, trx) => {
  const knex = trx || db;
  return knex.table('domain').insert(data);
};

const getUserGameSession = (playerId, trx) => {
  const knex = trx || db;
  return knex
    .select('plays', 'date', 'gameId') //join gameId to game name
    .from('user')
    .where({ playerId });
};
module.exports = {
  insertGameSession,
  getUserGameSession
};
