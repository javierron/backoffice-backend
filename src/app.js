const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8080;
const jwt = require('./jwt.js');

app.use(express.json());
app.use(morgan('dev'));

const db = require('./db/db.js');
const { APIHandler } = require('./express-handler.js');

const session = require('./routes/session/handler.js');
const user = require('./routes/user/handler.js');
const pos = require('./routes/pos/handler.js');

app.get('/ping', (_, res) => res.send('pong'));

app.post('/gamesession', APIHandler(session.post));
app.get('/gamesession/:playerId', APIHandler(session.get));
//app.get('/gamesession/:terminalId', APIHandler(session.get));
//app.get('/gamesession/:posId', APIHandler(session.get));
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
app.post('/user/login', APIHandler(user.login.post));

app.post('/pos', jwt.userMiddleware, jwt.errorHandler, APIHandler(pos.post));
app.post(
  '/pos/assign',
  jwt.userMiddleware,
  jwt.errorHandler,
  APIHandler(pos.assign.post)
);
// app.get('/pos/:posId', APIHandler(pos.get));
// app.patch('/pos/:posId', APIHandler(pos.patch));
// app.del('/pos/:posId', APIHandler(pos.delete));

// app.post('/terminal', APIHandler(terminal.post));
// app.get('/terminal/:terminalId', APIHandler(terminal.get));
// app.get('/terminal/:posId', APIHandler(terminal.get));
// app.patch('/terminal/:terminalId', APIHandler(terminal.patch));
// app.del('/terminal/:terminalId', APIHandler(terminal.delete));

app.post('/user', jwt.userMiddleware, jwt.errorHandler, APIHandler(user.post));
// app.get('/user/:userId', APIHandler(user.get));
// app.get('/user/:adminId', APIHandler(user.get));
// app.get('/user/:posId', APIHandler(user.get));
// app.patch('/user/:userId', APIHandler(user.patch));
// app.del('/user/:userId', APIHandler(user.delete));

//--------------------------------------------------------------------------------

// app.post('/balance/:userId', APIHandler());
// app.post('/balance/:terminalId', APIHandler());

const server = app.listen(port);

module.exports = {
  destroy: () => {
    server.close();
    db.destroy();
  }
};
