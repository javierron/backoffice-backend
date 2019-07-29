const Joi = require('joi');

const sessionSchema = Joi.object().keys({
  //TODO: move session schema to a single module
  userId: Joi.number().integer(),
  permission: Joi.number().integer()
});

const createPos = body => {
  const schema = Joi.object().keys({
    session: sessionSchema,
    name: Joi.string().max(32),
    description: Joi.string().max(128)
  });

  return Joi.validate(body, schema, {
    presence: 'required',
    stripUnknown: true
  });
};

const assignPos = body => {
  const schema = Joi.object().keys({
    session: sessionSchema,
    userId: Joi.number().integer(),
    posId: Joi.number().integer()
  });

  return Joi.validate(body, schema, {
    presence: 'required',
    stripUnknown: true
  });
};

module.exports = {
  createPos,
  assignPos
};
