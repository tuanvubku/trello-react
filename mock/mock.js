const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { currentUser } = require('./User');

const app = express();
const PORT = process.env.MOCK_PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// logger
app.use('/**', (req, res, next) => {
  console.log(
    `[${req.method}] ${req.originalUrl} || ${JSON.stringify(req.body)}`
  );
  next();
});

app.get('/api/me', (req, res) => {
  res.send({
    status: 'ok',
    ...currentUser
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'nguyenvanteo' && password === '123456') {
    res.send({
      status: 'ok',
      ...currentUser
    });
  } else {
    res.send({
      status: 'error'
    });
  }
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`APP is listening on port ${PORT}`);
  }
});
