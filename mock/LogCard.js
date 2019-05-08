const express = require('express');
const router = express.Router();
const moment = require('moment');

const sampleLogCards = [
  {
    _id: 1,
    action: 'logCard1 logCard1 logCard1 logCard1 logCard1 logCard1 logCard1 logCard1',
    dateCreated: moment().subtract(1, 'months'),
    cardId:1,
    ownerId: 1
  },
  {
    _id: 2,
    action: 'logCard2',
    dateCreated: moment().subtract(1, 'months'),
    cardId:1,
    ownerId: 1
  },
  {
    _id: 3,
    action: 'logCard3',
    dateCreated: moment().subtract(1, 'months'),
    cardId:1,
    ownerId: 1
  }
];

router.get('/', (req, res) => {
  const { cardId } = req.query;
  if (cardId === undefined) throw Error('cardId id is not given');
  res.send({
    status: 'ok',
    logCard: sampleLogCards
  });
});

router.get('/:id', (req, res) => {
  let { id } = req.params;

  id = (parseInt(id) % 3) + 1;

  const logCardFound = sampleLogCards.find(({ _id }) => _id === id);

  if (logCardFound === undefined) throw Error(`logCard #${id} is not found`);

  res.send({
    status: 'ok',
    logCard: logCardFound
  });
});

router.post('/', (req, res) => {
  const { action } = req.body;

  const newLogCard = {
    _id: sampleLogCards.length + 1,
    action,
    dateCreated: moment()
  };

  

  res.send({
    status: 'ok',
    logCard: newLogCard
  });
});

module.exports = {
  logCardEndpoint: router,
  sampleLogCards
};
