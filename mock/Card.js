const express = require('express');
const router = express.Router();
const moment = require('moment');

var sampleCards = [
  {
    _id: 1,
    description: 'AAAAAAAAAAAAAAAA',
    dateCreated: moment().subtract(1, 'months'),
    ownerId: 1,
    title: 'title',
    archived: true,
    listId: 1,
    deadline: new Date(),
    labels: [{ labelColor: 'red', labelText: '' }, { labelColor: 'blue', labelText: '' }, { labelColor: 'green', labelText: '' }],
    order: 1,
    fileUrl: ['A1', 'B1'],
    members: [{ _id: 1, username: 'Afghanistan  ', imageUrl: 'http://tinyurl.com/y2huxff2' },
    { _id: 2, username: 'bland ', imageUrl: 'http://tinyurl.com/y2sb9nog' },
    { _id: 1, username: 'clbania', imageUrl: 'http://tinyurl.com/y2sb9nog' },],
    comments: [1, 2, 3],
    logs: [1, 2, 3]
  },
  {
    _id: 2,
    description: 'BBBBBBBBBBBBBBB',
    dateCreated: moment().subtract(1, 'months'),
    ownerId: 1,
    title: 'title',
    archived: false,
    listId: 1,
    deadline: new Date(),
    labels: [{ labelColor: 'red', labelText: '' }, { labelColor: 'blue', labelText: '' }, { labelColor: 'green', labelText: '' }],
    order: 3,
    fileUrl: ['A2', 'B2'],
    members: [{ _id: 1, username: 'Afghanistan  ', imageUrl: 'http://tinyurl.com/y2huxff2' },
    { _id: 2, username: 'bland ', imageUrl: 'http://tinyurl.com/y2sb9nog' },
    { _id: 1, username: 'clbania', imageUrl: 'http://tinyurl.com/y2sb9nog' },],
    comments: [1, 2, 3],
    logs: [1, 2, 3]
  },
  {
    _id: 3,
    description: 'CCCCCCCCCCCCCC',
    dateCreated: moment().subtract(1, 'months'),
    ownerId: 1,
    title: 'title',
    archived: true,
    listId: 1,
    deadline: new Date(),
    labels: [{ labelColor: 'red', labelText: '' }, { labelColor: 'blue', labelText: '' }, { labelColor: 'green', labelText: '' }],
    order: 2,
    members: [{ _id: 1, username: 'Afghanistan', imageUrl: 'http://tinyurl.com/y2huxff2' },
    { _id: 2, username: 'bland', imageUrl: 'http://tinyurl.com/y2sb9nog' },
    { _id: 1, username: 'clbania', imageUrl: 'http://tinyurl.com/y2sb9nog' }],   // populate 
    fileUrl: [],
    comments: [1, 2, 3],
    logs: [1, 2, 3]
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

router.post('/edit', (req, res) => {
  var { _id, title, description, deadline, label ,archived} = req.body;
  if (description) sampleCards[_id - 1].description = description;
  if (title) sampleCards[_id - 1].title = title;
  if (deadline) sampleCards[_id - 1].deadline = deadline; 
  if (archived!==undefined) sampleCards[_id - 1].archived = archived;
  if (label) {
    for (var x of sampleCards[_id - 1].labels) {
      if (x.labelColor ===label.labelColor) {
        x.labelText = label.labelText;
        res.send({
          status: 'ok',
          card: sampleCards[_id - 1]
        });
        return;
      }
    }
    sampleCards[_id - 1].labels.push(label);
  }
  res.send({
    status: 'ok',
    card: sampleCards[_id - 1]
  });
});
router.post('/remove-label', (req, res) => {
  var { _id, labelColor, // idUserRemove 
  } = req.body;
  
  if (labelColor) {
    var tem=[]; 
    for (var x of sampleCards[_id - 1].labels) {
      if (x.labelColor  !==labelColor) {
        
        tem.push(x);
      }
    } 
    sampleCards[_id - 1].labels=tem;
  } 
  res.send({
    status: 'ok',
    card: sampleCards[_id - 1]
  });
});
router.post('/add-member', (req, res) => {
  sampleCards[req.body._id - 1].members.push({
    _id: 1, username: req.body.newMemberName
    , imageUrl: 'http://tinyurl.com/y2sb9nog'
  });

  // add to log here
  res.send({
    status: 'ok',
    card: sampleCards[req.body._id - 1]
  });
});
router.post('/remove-member', (req, res) => {
  var { _id, memberName, // idUserMove 
  } = req.body;
  var mems = sampleCards[_id - 1].members;
  var tem=[];
  for (var x in mems) {
    if (memberName  !==mems[x].username) {
      tem.push(mems[x]) 
    }
  }
  sampleCards[_id - 1].members = tem;
  // add to log here 
  res.send({
    status: 'ok',
    card: sampleCards[_id - 1]
  });
});
router.post('/move', (req, res) => {
  var { _id, newListId, // idUserMove,
     order } = req.body;
  sampleCards[_id - 1].listId = newListId;
  sampleCards[_id - 1].order = order;
  // and add to log , dbs done this
  res.send({
    status: 'ok',
    card: sampleCards[_id - 1]
  });
});
router.delete('/:_id', (req, res) => {
  var _id = req.params._id;
  // var { idUserRemove } = req.body;
  // add log here
  var rs=[];
  for(var x of sampleCards)
  {
    if(String(x._id)!==String(_id))rs.push(x);
  }
  sampleCards = rs;
  res.send({
    status: 'ok'
  });
});
module.exports = {
  cardEndpoint: router,
  sampleCards
};
