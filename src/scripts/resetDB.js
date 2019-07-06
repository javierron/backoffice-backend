#!/usr/bin/env node

if (process.env.NODE_ENV === 'production') {
  console.error('Production env error');
  process.exit(1);
}

const knex = require('../db/db.js');

const resetDB = async () => {
  try {
    await knex('gameSession').del();

    knex.destroy();
  } catch (err) {
    console.error(err);
  }
};

resetDB();
