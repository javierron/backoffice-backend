const db = require('../db/db.js');

const findUser = (whereObj = {}) =>
  db
    .select()
    .from('user')
    .where(whereObj);

const findGameSession = (whereObj = {}) =>
  db
    .select()
    .from('gameSession')
    .where(whereObj);

module.exports = {
  findUser,
  findGameSession
};
