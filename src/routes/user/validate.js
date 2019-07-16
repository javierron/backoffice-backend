const Joi = require('joi');

const sessionSchema = Joi.object().keys({
  userId: Joi.number().integer(),
  permission: Joi.number().integer()
});

const login = body => {
  const schema = Joi.object().keys({
    username: Joi.string(), //TODO: linit - username schema?
    password: Joi.string() //TODO: limit
  });

  return Joi.validate(body, schema, {
    presence: 'required',
    stripUnknown: true
  });
};

const createUser = body => {
  const schema = Joi.object().keys({
    session: sessionSchema,
    username: Joi.string(), //TODO: limit - username schema?
    password: Joi.string(), //TODO: limit
    permission: Joi.any()
      .only([1, 2])
      .optional()
  });

  return Joi.validate(body, schema, {
    presence: 'required',
    stripUnknown: true
  });
};

module.exports = {
  login,
  createUser
};
