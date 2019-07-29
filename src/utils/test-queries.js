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

const findPos = (whereObj = {}) =>
  db
    .select()
    .from('pos')
    .where(whereObj);

const findUserPos = (whereObj = {}) =>
  db
    .select()
    .from('userPos')
    .where(whereObj);

module.exports = {
  findUser,
  findGameSession,
  findPos,
  findUserPos
};
