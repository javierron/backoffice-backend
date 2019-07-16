const passwordUtils = require('../../utils/password.js');
const sessions = require('../../jwt.js');
const queries = require('../../sql/user-queries.js');
const validate = require('./validate.js');

const subHandlers = {
  0: require('./sub-handlers/super-handler.js'),
  1: require('./sub-handlers/admin-handler.js')
};

const login = async data => {
  const { value, error } = validate.login(data);
  if (error) return { status: 422, resp: error };

  const { username, password } = value;

  const [userData] = await queries.getUserData(username);

  if (!userData)
    return {
      status: 401,
      resp: 'invalid login'
    };

  const passwordMatch = await passwordUtils.compare(
    password,
    userData.password
  );

  if (!passwordMatch)
    return {
      status: 401,
      resp: 'invalid login'
    };

  const token = sessions.createUserToken({
    userId: userData.rowid,
    permission: userData.permission
  });

  return {
    status: 200,
    resp: token
  };
};

const createUser = data => {
  const { value, error } = validate.createUser(data);
  if (error) return { status: 422, resp: error };

  const { session } = value;
  const { permission } = session;

  const handler = subHandlers[permission];

  return handler
    ? handler.createUser(value)
    : { status: 400, resp: 'bad request' };
};

module.exports = {
  login: {
    post: login
  },
  post: createUser
};
