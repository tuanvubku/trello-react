const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { authEndpoint, sampleToken } = require('./Auth');
const { userEndpoint } = require('./User');
const { boardEndpoint } = require('./Board');
const { listEndpoint } = require('./List');
const { cardEndpoint } = require('./Card');
const { commentEndpoint } = require('./Comment');
const { logCardEndpoint } = require('./LogCard');

const app = express();
const PORT = process.env.MOCK_PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// logger
app.use('/**', (req, res, next) => {
  const {
    method,
    originalUrl,
    headers: { authorization },
    body
  } = req;

  console.log(
    `[${method}] ${originalUrl} ||
      ${authorization} ||
      ${JSON.stringify(body)}`
  );
  next();
});

app.use((req, res, next) => {
  // check token and init req.user
  const { authorization: raw_token = 'Bearer ' } = req.headers;
  const token = raw_token.split('Bearer ')[1];
  const freeRoute = ['/api/auth/login', '/api/auth/register'];

  if (freeRoute.find(r => r === req.url)) {
    next();
  } else if (token.includes(sampleToken)) {
    const userId = token.split(sampleToken)[1];
    req.user = {
      id: parseInt(userId)
    };
    next();
  } else {
    throw Error('Token incorrect');
  }
});

app.use('/api/auth', authEndpoint);
app.use('/api/user', userEndpoint);
app.use('/api/board', boardEndpoint);
app.use('/api/list', listEndpoint);
app.use('/api/card', cardEndpoint);
app.use('/api/comment', commentEndpoint);
app.use('/api/logCard', logCardEndpoint);

app.use((err, req, res, next) => {
  res.send({
    status: 'error',
    error: 500,
    message: err.message
  });
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`APP is listening on port ${PORT}`);
  }
});
