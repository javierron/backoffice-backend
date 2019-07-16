const db = require('../db/db.js');

const insertGameSession = (data, trx) => {
  const knex = trx || db;
  return knex.table('gameSession').insert(data);
};

const getUserGameSession = (playerId, trx) => {
  const knex = trx || db;
  return knex
    .select('plays', 'date', 'gameId') //join gameId to game name
    .from('gameSession')
    .where({ playerId });
};
module.exports = {
  insertGameSession,
  getUserGameSession
};
