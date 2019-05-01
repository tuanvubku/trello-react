const express = require('express');
const router = express.Router();
const moment = require('moment');

const sampleCards = [
  {
    _id: 1,
    description: 'AAAAAAAAAAAAAAAA',
    dateCreated: moment().subtract(1, 'months')
  },
  {
    _id: 2,
    description: 'BBBBBBBBBBBBBBB',
    dateCreated: moment().subtract(1, 'months')
  },
  {
    _id: 3,
    description: 'CCCCCCCCCCCCCC',
    dateCreated: moment().subtract(1, 'months')
  }
];

router.get('/', (req, res) => {
  const { board, list } = req.query;

  if (board === undefined) throw Error('Board id is not given');
  if (list === undefined) throw Error('List id is not given');

  res.send({
    status: 'ok',
    card: sampleCards
  });
});

router.get('/:id', (req, res) => {
  let { id } = req.params;

  id = (parseInt(id) % 3) + 1;

  const cardFound = sampleCards.find(({ _id }) => _id === id);

  if (cardFound === undefined) throw Error(`Card #${id} is not found`);

  res.send({
    status: 'ok',
    card: cardFound
  });
});

router.post('/', (req, res) => {
  const { description } = req.body;

  const newCard = {
    _id: sampleCards.length + 1,
    description,
    dateCreated: moment()
  };

  // sampleLists.push(newList);

  res.send({
    status: 'ok',
    card: newCard
  });
});

module.exports = {
  cardEndpoint: router,
  sampleCards
};
