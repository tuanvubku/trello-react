"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const MESSAGE = require("../utils/constant");
const mongoose = require("mongoose");
const Board_1 = require("../Models/Board");
const User_1 = require("../Models/User");
const List_1 = require("../Models/List");
const Card_1 = require("../Models/Card");
const Comment_1 = require("../Models/Comment");
const router = express.Router();
const BoardModel = new Board_1.default().getModelForClass(Board_1.default);
const UserModel = new User_1.default().getModelForClass(User_1.default);
const ListModel = new List_1.default().getModelForClass(List_1.default);
const CardModel = new Card_1.default().getModelForClass(Card_1.default);
const CommentModel = new Comment_1.default().getModelForClass(Comment_1.default);
var ObjectId = mongoose.Types.ObjectId;
// API for testing
//show all board,just for test
router.get('/', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const board = yield BoardModel.find({}); //WHY NOT SHOW REF        
        res.send(board);
    }))();
});
// api delete all board
router.get('/delete-all', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const board = yield BoardModel.remove({});
        res.send(board);
    }))();
});
//api del by name
router.get('/delete/:boardname', (req, res) => {
    var { boardname } = req.params;
    (() => __awaiter(this, void 0, void 0, function* () {
        const board = yield BoardModel.deleteOne({ name: boardname });
        res.send({ status: MESSAGE.DELETE_BOARD_OK, board });
    }))();
});
//end API for test ///////////////////////////////
// api delete by _id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const board = yield BoardModel.deleteOne({ _id });
        yield ListModel.deleteMany({ boardId: _id });
        res.send({
            status: MESSAGE.DELETE_BOARD_OK
        });
    }))();
});
router.post('/add', (req, res) => {
    var { name, ownerId, modeView, background, members } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const b = new BoardModel({ name, ownerId, modeView, background });
        var board = yield b.save();
        if (members !== null && members !== undefined)
            for (let name of members) // conver name --> _id
             {
                const memId = yield UserModel.findOne({ username: name });
                yield BoardModel.updateOne({ _id: board._id }, { $push: { members: new ObjectId(String(memId._id)) } });
            }
        board = yield BoardModel.findOne({ _id: board._id });
        res.send({
            status: MESSAGE.ADD_BOARD_OK, board
        });
    }))();
});
//update info board: name, modeView, background
router.post('/edit', (req, res) => {
    const { _id, name, modeView, background } = req.body;
    var existboard;
    (() => __awaiter(this, void 0, void 0, function* () {
        existboard = yield BoardModel.findOne({ _id });
        if (existboard === null)
            res.send({ status: MESSAGE.NOT_FOUND });
        var obj = {};
        if (name !== null && name !== undefined) //field which was modified will update, else not update
            obj['name'] = name;
        if (modeView !== null && modeView !== undefined)
            obj['modeView'] = String(modeView).toLowerCase() == 'true' ? true : false;
        if (background !== null && background !== undefined)
            obj['background'] = background;
        yield BoardModel.update({ _id }, { $set: obj });
        const board = yield BoardModel.findOne({ _id });
        res.send({
            status: MESSAGE.EDIT_BOARD_OK, board
        });
    }))();
});
//add memm
router.post('/add-member', (req, res) => {
    var { _id, newMemberName } = req.body; //newMember is name
    var existboard;
    (() => __awaiter(this, void 0, void 0, function* () {
        const newMember = yield UserModel.findOne({ username: newMemberName }); //CHUA CHECK DA CO ROI
        existboard = yield BoardModel.findOne({ _id });
        yield BoardModel.updateOne({ _id }, { $addToSet: { members: new ObjectId(String(newMember._id)) } });
        const board = yield BoardModel.findOne({ _id });
        res.send({
            status: MESSAGE.ADD_MEMBER_OK, board
        });
    }))();
});
router.post('/remove-member', (req, res) => {
    var { _id, memberName } = req.body; //memberName is name
    var existboard;
    (() => __awaiter(this, void 0, void 0, function* () {
        const Member = yield UserModel.findOne({ username: memberName });
        existboard = yield BoardModel.findOne({ _id });
        yield BoardModel.updateOne({ _id }, { $pull: { members: new ObjectId(String(Member._id)) } });
        const board = yield BoardModel.findOne({ _id });
        res.send({
            status: MESSAGE.DELETE_MEMBER_OK, board
        });
    }))();
});
//query all list of board
router.get('/:_id/lists', (req, res) => {
    var { _id } = req.params;
    (() => __awaiter(this, void 0, void 0, function* () {
        var thisBoard = yield BoardModel.find({ _id });
        thisBoard = thisBoard[0];
        var members = yield UserModel.find({ _id: { $in: thisBoard.members } }, { username: 1, imageUrl: 1 });
        thisBoard.members = members;
        var lists = yield ListModel.find({ boardId: _id }).sort({ dateCreate: 1 });
        for (let l of lists) {
            var cards = yield CardModel.find({ listId: l._id }).populate('ownerId', 'username imageUrl').sort({ order: 1 });
            ;
            for (let c of cards) {
                var comments = yield CommentModel.find({ cardId: c._id }, { _id: 1 });
                var t = [];
                for (let x of comments)
                    t.push(x._id);
                c.comments = t;
            }
            l.cards = cards;
        }
        thisBoard.lists = lists;
        res.send({
            status: MESSAGE.QUERY_OK, thisBoard
        });
    }))();
});
exports.default = router;
