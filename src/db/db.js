const { convertDateToUTCTimestamp } = require('../utils/date-utils.js');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;
const config = {
  client: 'mysql'
};

const customDateTimeTypecaster = (field, next) => {
  // cast DATETIME to timestamp number
  if (field.type === 'DATETIME') {
    const date = new Date(field.string());
    return convertDateToUTCTimestamp(date);
  }
  return next();
};

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line fp/no-mutation
  config.connection = {
    host: MYSQL_HOST || '127.0.0.1',
    user: MYSQL_USER || 'root',
    password: MYSQL_PASS || '',
    database: MYSQL_DB || 'aenima_db',
    timezone: 'UTC',
    typeCast: customDateTimeTypecaster,
    charset: 'utf8mb4'
  };
}

module.exports = require('knex')(config);
