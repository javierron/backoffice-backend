const queries = require('../../../sql/pos-queries.js');
const db = require('../../../db/db.js');

const createPos = async value => {
  const { name, description, session } = value;
  const { userId } = session;
  const saveData = {
    name,
    description,
    date: new Date().toISOString()
  };

  await db.transaction(async trx => {
    const [posId] = await queries.insertPos(saveData, trx);
    await queries.setUser(
      {
        userId,
        posId
      },
      trx
    );
  });

  return {
    status: 200,
    resp: 'OK'
  };
};

const assignPos = () => {
  return {
    status: 403,
    resp: 'forbidden'
  };
};

module.exports = {
  createPos,
  assignPos
};
