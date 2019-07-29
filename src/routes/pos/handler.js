const validate = require('./validate.js');

const subHandlers = {
  0: require('./sub-handlers/super-handler'),
  1: require('./sub-handlers/admin-handler')
};

const createPos = async data => {
  const { value, error } = validate.createPos(data);
  if (error) return { status: 422, resp: error };

  const { session } = value;
  const { permission } = session;

  const handler = subHandlers[permission];

  return handler
    ? await handler.createPos(value)
    : { status: 400, resp: 'bad request' };
};

const assignPos = async data => {
  const { value, error } = validate.assignPos(data);
  if (error) return { status: 422, resp: error };

  const { session } = value;
  const { permission } = session;

  const handler = subHandlers[permission];

  return handler
    ? await handler.assignPos(value)
    : { status: 400, resp: 'bad request' };
};

module.exports = {
  post: createPos,
  assign: {
    post: assignPos
  }
};
