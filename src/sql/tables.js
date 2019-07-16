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
  table.integer('bet');
  table.dateTime('date');

  //   table
  //     .foreign('playerId')
  //     .references('rowid')
  //     .inTable('player');

  //   table
  //     .foreign('gameId')
  //     .references('rowid')
  //     .inTable('game');
};

const createUserColumns = table => {
  table.bigIncrements('rowid');
  table.string('username').notNullable();
  table.string('password').notNullable();
  table
    .float('balance')
    .notNullable()
    .default(0);
  table.dateTime('date').notNullable();
  table.integer('permission').notNullable();
};

const createUserAdminColumns = table => {
  table.bigIncrements('rowid');
  table
    .bigInteger('userId')
    .unsigned()
    .notNullable();
  table
    .bigInteger('adminId')
    .unsigned()
    .notNullable();

  table
    .foreign('userId')
    .references('rowid')
    .inTable('user');

  table
    .foreign('adminId')
    .references('rowid')
    .inTable('user');
};

const createTables = () => {
  return db.schema
    .createTable('gameSession', createGameSessionColumns)
    .createTable('user', createUserColumns)
    .createTable('userAdmin', createUserAdminColumns);
};

module.exports = {
  createTables
};
