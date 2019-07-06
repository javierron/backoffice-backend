const validate = require('./validate.js');
const queries = require('../../sql/game-session-queries');

const postGameSession = async data => {
  const { value, error } = validate.postGameSession(data);
  if (error) return { status: 422, resp: error };

  const { sessions } = value;
  await queries.insertGameSession(sessions);

  return {
    status: 200,
    resp: 'OK'
  };
};

const getPlayerGameSessions = async data => {
  const { value, error } = validate.getPlayerGameSessions(data);
  if (error) return { status: 422, resp: error };

  const { playerId } = value;

  const queryData = {
    playerId
  };

  const sessions = await queries.getUserGameSession(queryData);
  return {
    status: 200,
    resp: sessions
  };
};

module.exports = {
  post: postGameSession,
  get: getPlayerGameSessions
};
