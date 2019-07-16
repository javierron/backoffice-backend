const bcrypt = require('bcrypt');
const saltRounds = 10;

const hash = password => {
  return bcrypt.hash(password, saltRounds);
};

const compare = (received, stored) => {
  return bcrypt.compare(received, stored);
};

module.exports = {
  hash,
  compare
};
