const express = require('express');
const router = express.Router();
const moment = require('moment');

const sampleBoards = [
  {
    _id: 1,
    name: 'Back Khoa',
    ownerId: 1,
    modelView: 'private',
    background: 'abc',
    member: [1, 2],
    dateCreated: moment().subtract(1, 'months'),
    list: [1, 2, 3]
  },
  {
    _id: 2,
    name: 'English',
    ownerId: 1,
    modelView: 'private',
    background: 'abc',
    member: [1, 3],
    dateCreated: moment().subtract(3, 'months'),
    list: [4, 5, 6]
  },
  {
    _id: 3,
    name: 'Interview prepare',
    ownerId: 1,
    modelView: '',
    background: 'public',
    member: [1, 2, 3],
    dateCreated: moment().subtract(3, 'weeks'),
    list: [7, 8, 9]
  },
  {
    _id: 4,
    name: 'Dummy List',
    ownerId: 1,
    modelView: 'private',
    background: 'abc',
    member: [1, 2, 3, 4],
    dateCreated: moment().subtract(2, 'days'),
    list: [10, 11, 12]
  }
];

router.get('/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const boardFound = sampleBoards.find(({ _id }) => _id === id);

  if (boardFound === undefined) throw Error(`Board #${id} is not found`);

  res.send({
    status: 'ok',
    board: boardFound
  });
});

router.post('/', (req, res) => {
  const { name, modelView = 'private' } = req.body;
  const { id: ownerId } = req.user;

  const newBoard = {
    _id: sampleBoards.length + 1,
    name,
    ownerId,
    modelView,
    background: 'abc',
    member: [ownerId],
    dateCreated: moment(),
    list: []
  };

  sampleBoards.push(newBoard);

  res.send({
    status: 'ok',
    board: newBoard
  });
});

module.exports = {
  boardEndpoint: router,
  sampleBoards
};
