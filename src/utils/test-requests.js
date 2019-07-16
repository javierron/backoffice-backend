const request = require('superagent');

const url = 'localhost:8080';

//GAME SESSIONS
//----------------------------------------------------
const getGameSessions = playerId =>
  request
    .get(`${url}/gamesession/${playerId}`)
    .ok(res => res.status)
    .send();

const postGameSessions = sessions =>
  request
    .post(`${url}/gamesession/`)
    .ok(res => res.status)
    .send(sessions);
//----------------------------------------------------

//USER
//----------------------------------------------------
const login = credentials =>
  request
    .post(`${url}/user/login`)
    .ok(res => res.status)
    .send(credentials);

const createUser = (token, data) =>
  request
    .post(`${url}/user`)
    .set('Authorization', `Bearer ${token}`)
    .ok(res => res.status)
    .send(data);

//----------------------------------------------------

module.exports = {
  getGameSessions,
  postGameSessions,
  login,
  createUser
};
