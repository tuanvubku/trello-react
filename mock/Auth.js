const express = require('express');
const router = express.Router();

const { sampleUsers } = require('./User');

const sampleToken = 'TOKEN IS HERE';

router.get('/me', (req, res) => {
  const {
    user: { id }
  } = req;

  const userFound = sampleUsers.find(({ _id }) => _id === id);

  if (userFound === undefined) throw Error('User not found from given token');

  const { role, ...user } = userFound;
  delete user.password;

  res.send({
    status: 'ok',
    user,
    role
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const userFound = sampleUsers.find(
    ({ username: name, password: pass }) =>
      name === username && pass === password
  );

  if (userFound === undefined) throw Error('Username or password not found');

  const { role, ...user } = userFound;
  delete user.password;

  res.status(200).send({
    status: 'ok',
    user,
    role,
    token: sampleToken + user._id
  });
});

module.exports = {
  authEndpoint: router,
  sampleToken
};
