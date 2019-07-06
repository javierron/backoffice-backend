const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const { APIHandler } = require('./express-handler.js');

const session = require('./routes/session/handler.js');

app.post('/gamesession', APIHandler(session.post));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
