const express = require('express');
const router = express.Router();
const moment = require('moment');

const { sampleBoards } = require('./Board');

const sampleUsers = [
  {
    _id: 1,
    username: 'teo',
    imageUrl: '',
    password: '123456',
    dateCreated: moment().subtract(3, 'months'),
    role: ['user']
  },
  {
    _id: 2,
    username: 'ti',
    imageUrl: '',
    password: '123456',
    dateCreated: moment().subtract(1, 'days'),
    role: ['user']
  },
  {
    _id: 3,
    username: 'ton',
    imageUrl: '',
    password: '123456',
    dateCreated: moment().subtract(1, 'weeks'),
    role: ['user']
  },
  {
    _id: 4,
    username: 'tasdfsdaf',
    imageUrl: '',
    password: '123456',
    dateCreated: moment().subtract(4, 'months'),
    role: ['role']
  }
];

router.get('/myboard', (req, res) => {
  const { id: userId } = req.user;

  const myboards = sampleBoards.filter(({ member }) => member.includes(userId));

  res.send({
    status: 'ok',
    board: myboards
  });
});

module.exports = {
  userEndpoint: router,
  sampleUsers
};
