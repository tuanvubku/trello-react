const express = require('express');
const router = express.Router();
const moment = require('moment');

const sampleLists = [
  {
    _id: 1,
    name: 'Xam quan 1',
    dateCreated: moment().subtract(1, 'months'),
    cards: [1, 2, 3]
  },
  {
    _id: 2,
    name: 'Xam quan 2',
    dateCreated: moment().subtract(1, 'months'),
    cards: [1, 2, 3]
  },
  {
    _id: 3,
    name: 'Xam quan 3',
    dateCreated: moment().subtract(1, 'months'),
    cards: [1, 2]
  }
];

router.get('/', (req, res) => {
  const { board } = req.query;

  if (board === undefined) throw Error('Board id is not given');

  res.send({
    status: 'ok',
    list: sampleLists
  });
});

router.get('/:id', (req, res) => {
  let { id } = req.params;

  id = (parseInt(id) % 3) + 1;

  const listFound = sampleLists.find(({ _id }) => _id === id);

  if (listFound === undefined) throw Error(`List #${id} is not found`);

  res.send({
    status: 'ok',
    list: listFound
  });
});

router.post('/', (req, res) => {
  const { name } = req.body;

  const newList = {
    _id: sampleLists.length + 1,
    name,
    dateCreated: moment(),
    cards: []
  };

  // sampleLists.push(newList);

  res.send({
    status: 'ok',
    list: newList
  });
});

module.exports = {
  listEndpoint: router,
  sampleLists
};
