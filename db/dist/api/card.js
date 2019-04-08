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
const Card_1 = require("../Models/Card");
const Comment_1 = require("../Models/Comment");
const User_1 = require("../Models/User");
const mongoose = require("mongoose");
const router = express.Router();
var ObjectId = mongoose.Types.ObjectId;
const CardModel = new Card_1.default().getModelForClass(Card_1.default);
const UserModel = new User_1.default().getModelForClass(User_1.default);
const CommentModel = new Comment_1.default().getModelForClass(Comment_1.default);
// API for testing
//show all card,just for test
router.get('/', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const card = yield CardModel.find({});
        res.send(card);
    }))();
});
// api delete all card
router.get('/delete-all', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const card = yield CardModel.remove({});
        res.send({ status: MESSAGE.DELETE_CARD_OK, card });
    }))();
});
// api delete by name
router.get('/delete/cardname', (req, res) => {
    var { cardname } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const card = yield CardModel.deleteOne({ cardname });
        res.send({ status: MESSAGE.DELETE_CARD_OK, card });
    }))();
});
//end API for test
// api delete by _id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const card = yield CardModel.deleteOne({ _id });
        //also delete all comment of this card
        yield CommentModel.deleteMany({ cardId: _id });
        res.send({ status: MESSAGE.DELETE_CARD_OK, card });
    }))();
});
router.post('/add', (req, res) => {
    var { title, ownerId, listId, deadline, description, order, label, members, fileUrl } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const c = new CardModel({ title, ownerId, listId, deadline, description, label, fileUrl });
        var card = yield c.save();
        if (members !== null && members !== undefined)
            for (let name of members) // conver name --> _id
             {
                const memId = yield UserModel.findOne({ username: name });
                yield CardModel.updateOne({ _id: card._id }, { $push: { members: new ObjectId(String(memId._id)) } });
            }
        card = yield CardModel.findOne({ _id: card._id });
        res.send({
            status: MESSAGE.ADD_CARD_OK, card
        });
    }))();
});
//update info card
router.post('/edit', (req, res) => {
    var existCard;
    var { _id, title, deadline, description, label, order, archived, fileUrl } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        existCard = yield CardModel.findOne({ _id });
        if (existCard === null)
            res.send({
                status: MESSAGE.ERROR
            });
        else {
            var obj = {}; //field which was modified will update, else not update
            if (title !== null && title !== undefined)
                obj['title'] = title;
            if (deadline !== null && deadline !== undefined)
                obj['deadline'] = deadline;
            if (description !== null && description !== undefined)
                obj['description'] = description;
            if (label !== null && label !== undefined)
                obj['label'] = label;
            if (order !== null && order !== undefined)
                obj['order'] = order;
            if (fileUrl !== null && fileUrl !== undefined)
                obj['fileUrl'] = fileUrl;
            if (archived !== null && archived !== undefined)
                obj['archived'] = String(archived).toLowerCase() == 'true' ? true : false;
            var card = yield CardModel.update({ _id }, { $set: obj });
            card = yield CardModel.findOne({ _id });
            res.send({
                status: MESSAGE.EDIT_CARD_OK, card
            });
        }
    }))();
});
//add mem
router.post('/add-member', (req, res) => {
    var { _id, newMemberName } = req.body; //newMember is name
    var existCard;
    (() => __awaiter(this, void 0, void 0, function* () {
        const newMember = yield UserModel.findOne({ username: newMemberName });
        existCard = yield CardModel.findOne({ _id });
        yield CardModel.updateOne({ _id }, { $addToSet: { members: new ObjectId(String(newMember._id)) } });
        const card = yield CardModel.findOne({ _id });
        if (card === null)
            res.send({ status: MESSAGE.NOT_FOUND });
        else
            res.send({
                status: MESSAGE.ADD_MEMBER_OK, card
            });
    }))();
});
//remove mem
router.post('/remove-member', (req, res) => {
    var { _id, memberName } = req.body; //newMember is name
    var existCard;
    (() => __awaiter(this, void 0, void 0, function* () {
        const Member = yield UserModel.findOne({ username: memberName });
        existCard = yield CardModel.findOne({ _id });
        yield CardModel.updateOne({ _id }, { $pull: { members: new ObjectId(String(Member._id)) } });
        const card = yield CardModel.findOne({ _id });
        res.send({
            status: MESSAGE.DELETE_MEMBER_OK, card
        });
    }))();
});
// drag card to other list
router.post('/move', (req, res) => {
    var { _id, newListId } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        yield CardModel.findOneAndUpdate({ _id }, { $set: { listId: new ObjectId(String(newListId)) } });
        const card = yield CardModel.findOne({ _id });
        res.send({
            status: MESSAGE.MOVE_CARD_OK, card
        });
    }))();
});
//query get all comment of card by id card
router.get('/:_id/comments', (req, res) => {
    var { _id } = req.params;
    (() => __awaiter(this, void 0, void 0, function* () {
        var thisCard = yield CardModel.find({ _id }).populate('ownerId', 'username imageUrl');
        thisCard = thisCard[0];
        var comments = yield CommentModel.find({ cardId: _id }).populate('ownerId', 'username imageUrl').sort({ dateCreate: -1 });
        thisCard.comments = comments;
        var members = [];
        for (let m of thisCard.members) {
            let t = yield UserModel.find({ _id: m }, { username: 1, imageUrl: 1 });
            members.push(t[0]);
        }
        thisCard.members = members;
        res.send({
            status: MESSAGE.QUERY_OK, thisCard
        });
    }))();
});
exports.default = router;
