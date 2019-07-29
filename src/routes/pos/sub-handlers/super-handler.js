const queries = require('../../../sql/pos-queries.js');

const createPos = async value => {
  const { name, description } = value;
  const saveData = {
    name,
    description,
    date: new Date().toISOString()
  };

  await queries.insertPos(saveData);
  //TODO: handle error

  return {
    status: 200,
    resp: 'OK'
  };
};

const assignPos = async value => {
  const { userId, posId } = value;

  const insertRes = await queries
    .setUser({
      userId,
      posId
    })
    .catch(err => ({ err }));

  return {
    status: insertRes.err ? 400 : 200,
    resp: 'OK'
  };
};

module.exports = {
  createPos,
  assignPos
};
