
import * as express from "express";
import * as MESSAGE from '../utils/constant';
import * as mongoose from 'mongoose';
import Board from '../Models/Board';
import User from '../Models/User';
import List from '../Models/List';
import Card from '../Models/Card';
import Comment from '../Models/Comment';
const router = express.Router();
const BoardModel = new Board().getModelForClass(Board);
const UserModel = new User().getModelForClass(User);
const ListModel = new List().getModelForClass(List);
const CardModel = new Card().getModelForClass(Card);
const CommentModel = new Comment().getModelForClass(Comment);
var ObjectId = mongoose.Types.ObjectId;

// API for testing
//show all board,just for test
router.get('/', (req, res) => {
    (async () => {
        const board = await BoardModel.find({}); //WHY NOT SHOW REF        
        res.send(board);
    })();
});

// api delete all board
router.get('/delete-all', (req, res) => {
    (async () => {
        const board = await BoardModel.remove({});
        res.send(board);
    })();
});

//api del by name
router.get('/delete/:boardname', (req, res) => {
    var { boardname } = req.params;
    (async () => {
        const board = await BoardModel.deleteOne({ name: boardname });
        res.send({ status: MESSAGE.DELETE_BOARD_OK, board });
    })();
});
//end API for test ///////////////////////////////



// api delete by _id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (async () => {
        const board = await BoardModel.deleteOne({ _id });
        await ListModel.deleteMany({ boardId: _id });
        res.send({
            status: MESSAGE.DELETE_BOARD_OK
        });
    })();
});

router.post('/add', (req, res) => {    //body.members : list name => conver list id
    var { name, ownerId, modeView, background, members } = req.body;
  
    (async () => {
        const b = new BoardModel({ name, ownerId, modeView, background });
        var board = await b.save();
        if(members!==null && members!== undefined)
        for (let name of members)   // conver name --> _id
        {
            const memId = await UserModel.findOne({ username: name });
            await BoardModel.updateOne({ _id: board._id }, { $push: { members: new ObjectId(String(memId._id)) } });
        }
        board = await BoardModel.findOne({ _id: board._id });
        res.send({
            status: MESSAGE.ADD_BOARD_OK, board
        });
    })();
});

//update info board: name, modeView, background
router.post('/edit', (req, res) => {
    const { _id, name, modeView, background } = req.body;
    var existboard;
    (async () => {
        existboard = await BoardModel.findOne({ _id });
        if (existboard === null) res.send({ status: MESSAGE.NOT_FOUND })
        var obj = {};
        if (name !== null && name !== undefined)   //field which was modified will update, else not update
            obj['name'] = name;
        if (modeView !== null && modeView !== undefined)
            obj['modeView'] = String(modeView).toLowerCase() == 'true' ? true : false;
        if (background !== null && background !== undefined)
            obj['background'] = background;
        await BoardModel.update({ _id }, { $set: obj });
        const board = await BoardModel.findOne({ _id });
        res.send({
            status: MESSAGE.EDIT_BOARD_OK, board
        });
    })();
});

//add memm
router.post('/add-member', (req, res) => { //add one member
    var { _id, newMemberName } = req.body;    //newMember is name
    var existboard;
    (async () => {
        const newMember = await UserModel.findOne({ username: newMemberName });   //CHUA CHECK DA CO ROI
        existboard = await BoardModel.findOne({ _id });
        await BoardModel.updateOne({ _id }, { $addToSet: { members: new ObjectId(String(newMember._id)) } });
        const board = await BoardModel.findOne({ _id });
        res.send({
            status: MESSAGE.ADD_MEMBER_OK, board
        });

    })();
});

router.post('/remove-member', (req, res) => {
    var { _id, memberName } = req.body;    //memberName is name
    var existboard;
    (async () => {
        const Member = await UserModel.findOne({ username: memberName });
        existboard = await BoardModel.findOne({ _id });
        await BoardModel.updateOne({ _id }, { $pull: { members: new ObjectId(String(Member._id)) } });
        const board = await BoardModel.findOne({ _id });
        res.send({
            status: MESSAGE.DELETE_MEMBER_OK, board
        });

    })();
});

//query all list of board
router.get('/:_id/lists', (req, res) => {
    var { _id } = req.params;
    (async () => {
        var thisBoard = await BoardModel.find({ _id });
        thisBoard = thisBoard[0];
        var members = await UserModel.find({ _id: { $in: thisBoard.members } }, { username: 1, imageUrl: 1 });
        thisBoard.members = members
        var lists = await ListModel.find({ boardId: _id }).sort( { dateCreate: 1 } );
        for (let l of lists) {
            var cards = await CardModel.find({ listId: l._id }).populate('ownerId', 'username imageUrl').sort( { order: 1 } );;
            for (let c of cards) {
                var comments = await CommentModel.find({ cardId: c._id },{_id:1});
                var t=[]
                for(let x of comments)
                t.push(x._id)
                c.comments = t;
            }
            l.cards = cards;
        }
        thisBoard.lists = lists;
        res.send({
            status: MESSAGE.QUERY_OK, thisBoard
        });
    })();
});
export default router;

