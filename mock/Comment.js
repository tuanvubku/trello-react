const express = require('express');
const router = express.Router();
const moment = require('moment');

const sampleComments = [
  {
    _id: 1,
    content: 'comment1',
    dateCreated: moment().subtract(1, 'months'),
    cardId:1,
    ownerId:1,
    fileUrl:'www.gg.gg'
  },
  {
    _id: 2,
    content: 'comment2',
    dateCreated: moment().subtract(1, 'months'),
    cardId:1,
    ownerId:2,
    fileUrl:'www.gg.gg'
  },
  {
    _id: 3,
    content: 'comment3',
    dateCreated: moment().subtract(1, 'months'),
    cardId:1,
    ownerId:1,
    fileUrl:'www.gg.gg'
  }
];

router.get('/', (req, res) => {
  const { cardId } = req.query;
  if (cardId === undefined) throw Error('cardId id is not given');
  res.send({
    status: 'ok',
    comment: sampleComments
  });
});

router.get('/:id', (req, res) => {
  let { id } = req.params;

  id = (parseInt(id) % 3) + 1;

  const commentFound = sampleComments.find(({ _id }) => _id === id);

  if (commentFound === undefined) throw Error(`comment #${id} is not found`);

  res.send({
    status: 'ok',
    comment: commentFound
  });
});


router.post('/edit', (req, res) => { 
  const { content,_id } = req.body;
  sampleComments[_id-1].content=content;
  console.log(sampleComments);
  res.send({
    status: 'ok',
    comment: sampleComments[_id-1]
  });
});

router.post('/add', (req, res) => { 
  const comment = req.body;
  comment._id=sampleComments.length + 1;
  sampleComments.push(comment);
  res.send({
    status: 'ok',
    comment:comment
  });
});


module.exports = {
  commentEndpoint: router,
  sampleComments
};
