const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const playerSecret = process.env.JWT_SECRET_PLAYER || 'player_secret';
const userSecret = process.env.JWT_SECRET_PLAYER || 'user_secret';

const permissions = {
  super: 0,
  admin: 1,
  user: 2
};

const JWT_EXPIRE_TIME = '12h';

const createUserToken = data => {
  const { userId, permission } = data;
  const tokenData = {
    userId,
    permission
  };
  return jwt.sign(tokenData, userSecret, {
    expiresIn: JWT_EXPIRE_TIME
  });
};

const createPlayerToken = data => {
  const { playerId } = data;
  const tokenData = {
    playerId
  };
  return jwt.sign(tokenData, playerSecret);
};

const userMiddleware = expressJwt({ secret: userSecret });
const playerMiddleware = expressJwt({ secret: playerSecret });

const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Authentication Failed');
    return;
  }
  next(err);
};

module.exports = {
  createUserToken,
  createPlayerToken,
  permissions,
  userMiddleware,
  playerMiddleware,
  errorHandler
};
