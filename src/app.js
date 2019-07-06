const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 8080;

app.use(express.json());
app.use(morgan('dev'));

const { APIHandler } = require('./express-handler.js');

const session = require('./routes/session/handler.js');

app.post('/gamesession', APIHandler(session.post));
app.get('/gamesession/:playerId', APIHandler(session.get));

app.listen(port, () => console.log(`Backend listening on port ${port}`));
