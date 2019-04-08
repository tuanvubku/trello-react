
import * as express from "express";
import * as MESSAGE from '../utils/constant';
import Card from '../Models/Card';
import Comment from '../Models/Comment';
import User from '../Models/User';
import * as mongoose from 'mongoose';
const router = express.Router();
var ObjectId = mongoose.Types.ObjectId;
const CardModel = new Card().getModelForClass(Card);
const UserModel = new User().getModelForClass(User);
const CommentModel = new Comment().getModelForClass(Comment);

// API for testing
//show all card,just for test
router.get('/', (req, res) => {
    (async () => {
        const card = await CardModel.find({});
        res.send(card);
    })();
});

// api delete all card
router.get('/delete-all', (req, res) => {
    (async () => {
        const card = await CardModel.remove({});
        res.send({status:MESSAGE.DELETE_CARD_OK,card});
    })();
});

// api delete by name
router.get('/delete/cardname', (req, res) => {
    var { cardname } = req.body;
    (async () => {
        const card = await CardModel.deleteOne({ cardname });
        res.send({status:MESSAGE.DELETE_CARD_OK,card});
    })();
});
//end API for test


// api delete by _id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (async () => {
        const card = await CardModel.deleteOne({ _id });
        //also delete all comment of this card
        await CommentModel.deleteMany({cardId:_id});
        res.send({status:MESSAGE.DELETE_CARD_OK,card});
    })();
});

router.post('/add', (req, res) => {
    var { title, ownerId, listId, deadline, description,order, label, members,fileUrl } = req.body;
    (async () => {
        const c = new CardModel({ title, ownerId, listId, deadline, description, label,fileUrl });
        var card = await c.save();
        if(members!==null && members!== undefined)
        for (let name of members)   // conver name --> _id
        {
            const memId = await UserModel.findOne({ username: name });
            await CardModel.updateOne({ _id: card._id }, { $push: { members: new ObjectId(String(memId._id)) } });
        }
        card = await CardModel.findOne({ _id: card._id });
        res.send({
            status: MESSAGE.ADD_CARD_OK, card
        });
    })();
});


//update info card
router.post('/edit', (req, res) => {
    var existCard;
    var { _id, title, deadline, description, label,order, archived, fileUrl } = req.body;
    (async () => {
        existCard = await CardModel.findOne({ _id });
        if (existCard === null)
            res.send({
                status: MESSAGE.ERROR
            });
        else {
            var obj = {};   //field which was modified will update, else not update
            if ( title !== null && title !== undefined) obj['title'] = title;
            if ( deadline !== null && deadline !== undefined) obj['deadline'] = deadline;
            if ( description !== null && description !== undefined) obj['description'] = description;
            if ( label !== null && label !== undefined) obj['label'] = label;
            if ( order !== null && order !== undefined) obj['order'] = order;
            if ( fileUrl !== null && fileUrl !== undefined) obj['fileUrl'] = fileUrl;
            if ( archived !== null && archived !== undefined) obj['archived'] = String(archived).toLowerCase()=='true'?true:false;  
            var card = await CardModel.update({ _id }, { $set: obj });
            card=await CardModel.findOne({ _id });
            res.send({
                status: MESSAGE.EDIT_CARD_OK, card
            });
        }
    })();
});


//add mem
router.post('/add-member', (req, res) => { //add one member
    var { _id, newMemberName } = req.body;    //newMember is name
    var existCard;
    (async () => {
        const newMember = await UserModel.findOne({ username: newMemberName });  
        existCard = await CardModel.findOne({ _id });
        await CardModel.updateOne({ _id }, { $addToSet: { members: new ObjectId(String(newMember._id)) } });
        const card = await CardModel.findOne({ _id });
        if(card===null)res.send({status:MESSAGE.NOT_FOUND});
        else res.send({
            status: MESSAGE.ADD_MEMBER_OK, card
        });
    })();
});

//remove mem
router.post('/remove-member', (req, res) => { //remove one member
    var { _id, memberName } = req.body;    //newMember is name
    var existCard;
    (async () => {
        const Member = await UserModel.findOne({ username: memberName });  
        existCard = await CardModel.findOne({ _id });
        await CardModel.updateOne({ _id }, { $pull: { members:new ObjectId(String(Member._id)) } });
        const card = await CardModel.findOne({ _id });
        res.send({
            status: MESSAGE.DELETE_MEMBER_OK, card
        });
    })();
});

// drag card to other list
router.post('/move', (req, res) => { 
    var { _id, newListId } = req.body;   
    (async () => {
        await CardModel.findOneAndUpdate({ _id }, { $set: { listId: new ObjectId(String(newListId)) } });
        const card = await CardModel.findOne({ _id });
        res.send({
            status: MESSAGE.MOVE_CARD_OK, card
        });
    })();
});

//query get all comment of card by id card
router.get('/:_id/comments', (req, res) => {
    var { _id } = req.params;
    (async () => {
        var thisCard = await CardModel.find({ _id }).populate('ownerId', 'username imageUrl');
        thisCard = thisCard[0];
        var comments = await CommentModel.find({ cardId:_id }).populate('ownerId', 'username imageUrl').sort( { dateCreate: -1 });  
        thisCard.comments = comments;
        var members=[]
        for(let m of thisCard.members)
        {   let t=await UserModel.find({_id:m},{username :1,imageUrl:1});
            members.push( t[0]);
        }
        thisCard.members=members;
        res.send({
            status: MESSAGE.QUERY_OK, thisCard
        });
    })();
});
export default router;

