const userQueries = require('../../../sql/user-queries.js');
const db = require('../../../db/db.js');
const hash = require('../../../utils/password.js');

const createUser = async value => {
  const { session, username, password } = value;

  const hashedPassword = await hash.hash(password);

  await db.transaction(async trx => {
    const [userId] = await userQueries.createUser(
      {
        username,
        password: hashedPassword,
        permission: 2,
        date: new Date().toISOString(),
        balance: 0
      },
      trx
    );

    await userQueries.setAdmin(
      {
        userId,
        adminId: session.userId
      },
      trx
    );
  });
  return { status: 200, resp: 'OK' };
};

module.exports = { createUser };
