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
const router = express.Router();
const BoardModel = new Board_1.default().getModelForClass(Board_1.default);
const UserModel = new User_1.default().getModelForClass(User_1.default);
const ListModel = new List_1.default().getModelForClass(List_1.default);
const CardModel = new Card_1.default().getModelForClass(Card_1.default);
var ObjectId = mongoose.Types.ObjectId;
// API for testing
//show all list,just for test
router.get('/', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const list = yield ListModel.find({}); //WHY NOT SHOW REF        
        res.send(list);
    }))();
});
// api delete all board
router.get('/delete-all', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const list = yield ListModel.remove({});
        res.send(list);
    }))();
});
// api delete by name
router.get('/delete/:listname', (req, res) => {
    var { listname } = req.params;
    (() => __awaiter(this, void 0, void 0, function* () {
        const list = yield ListModel.deleteOne({ name: listname });
        res.send({
            status: MESSAGE.DELETE_LIST_OK, list
        });
    }))();
});
//end API for test ///////////////////////////////
// api delete by id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const list = yield ListModel.deleteOne({ _id });
        yield CardModel.deleteMany({ listId: _id });
        res.send({
            status: MESSAGE.DELETE_LIST_OK, list
        });
    }))();
});
router.post('/add', (req, res) => {
    var { name, ownerId, boardId } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const l = new ListModel({ name, ownerId, boardId });
        var list = yield l.save();
        list = yield ListModel.findOne({ _id: list._id });
        res.send({
            status: MESSAGE.ADD_LIST_OK, list
        });
    }))();
});
//update info list  just edit name, archived
router.post('/edit', (req, res) => {
    const { _id, name, archived } = req.body;
    var list;
    (() => __awaiter(this, void 0, void 0, function* () {
        var obj = {};
        if (name !== null && name !== undefined)
            obj['name'] = name;
        if (archived !== null && archived !== undefined)
            obj['archived'] = String(archived).toLowerCase() == 'true' ? true : false;
        yield ListModel.update({ _id }, { $set: obj });
        list = yield ListModel.findOne({ _id });
        res.send({
            status: MESSAGE.EDIT_LIST_OK, list
        });
    }))();
});
exports.default = router;
