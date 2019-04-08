
import * as express from "express";
import * as MESSAGE from '../utils/constant';
import * as mongoose from 'mongoose';
import Board from '../Models/Board';
import User from '../Models/User';
import List from '../Models/List';
import Card from '../Models/Card';
const router = express.Router();
const BoardModel = new Board().getModelForClass(Board);
const UserModel = new User().getModelForClass(User);
const ListModel = new List().getModelForClass(List);
const CardModel = new Card().getModelForClass(Card);
var ObjectId = mongoose.Types.ObjectId;

// API for testing
//show all list,just for test
router.get('/', (req, res) => {
    (async () => {
        const list = await ListModel.find({}); //WHY NOT SHOW REF        
        res.send(list);
    })();
});

// api delete all board
router.get('/delete-all', (req, res) => {
    (async () => {
        const list = await ListModel.remove({});
        res.send(list);
    })();
});

// api delete by name
router.get('/delete/:listname', (req, res) => {
    var { listname } = req.params;
    (async () => {
        const list = await ListModel.deleteOne({ name:listname });
        res.send({
            status: MESSAGE.DELETE_LIST_OK, list
        });
    })();
});
//end API for test ///////////////////////////////



// api delete by id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (async () => {
        const list = await ListModel.deleteOne({ _id });
        await CardModel.deleteMany({listId:_id});
        res.send({
            status: MESSAGE.DELETE_LIST_OK, list
        });
    })();
});


router.post('/add', (req, res) => {    //body.members : list name => conver list id
    var { name,ownerId,boardId } = req.body;
    (async () => {
        const l = new ListModel({ name,ownerId,boardId });
        var list = await l.save();
        list=await ListModel.findOne({ _id: list._id });
        res.send({
            status: MESSAGE.ADD_LIST_OK, list
        });
    })();
});

//update info list  just edit name, archived
router.post('/edit', (req, res) => {     
    const { _id, name, archived  } = req.body;
    var list;
    (async () => {
        var obj={};
        if(name!== null && name!== undefined) obj['name']=name;
        if(archived!== null && archived!== undefined) obj['archived']=String(archived).toLowerCase()=='true'?true:false;
        await ListModel.update({ _id },{ $set:obj });
        list = await ListModel.findOne({ _id });
        res.send({
            status: MESSAGE.EDIT_LIST_OK, list
        });
    })();
});




export default router;

