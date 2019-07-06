const Joi = require('joi');

const gameSesionSchema = Joi.object().keys({
  // session: sessionSchema,
  gameId: Joi.number().integer(),
  playerId: Joi.number().integer(),
  plays: Joi.string(),
  date: Joi.date().timestamp('unix'),
  bet: Joi.number()
});

const postGameSession = body => {
  const schema = Joi.object().keys({
    sessions: Joi.array().items(gameSesionSchema)
  });

  return Joi.validate(body, schema, {
    presence: 'required',
    stripUnknown: true
  });
};

module.exports = {
  postGameSession
};
