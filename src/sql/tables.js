const db = require('../db/db.js');
const unicodeCollation = 'utf8mb4_unicode_ci';

const createGameSessionColumns = table => {
  table.bigIncrements('rowid');
  table.bigInteger('playerId').notNullable();
  table.bigInteger('gameId').notNullable();
  table
    .string('plays')
    .notNullable()
    .collate(unicodeCollation);
  table.int('bet');
  table.datetime('date');

  //   table
  //     .foreign('playerId')
  //     .references('rowid')
  //     .inTable('player');

  //   table
  //     .foreign('gameId')
  //     .references('rowid')
  //     .inTable('game');
};

const createTables = () => {
  return db.schema.createTable('gameSession', createGameSessionColumns);
};

module.exports = {
  createTables
};
