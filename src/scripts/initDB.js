#!/usr/bin/env node

const knex = require('../db/db.js');
const { createTables } = require('../sql/tables.js');

const hasTables = () => knex.schema.hasTable('gameSession');

const tryToCreateTables = async () => {
  const dbExists = await hasTables();
  if (dbExists) console.error('Error: already has tables');
  else await createTables();
};

const initDB = async () => {
  try {
    await tryToCreateTables();
    await knex.destroy();
  } catch (err) {
    console.error(err);
  }
};

initDB();
