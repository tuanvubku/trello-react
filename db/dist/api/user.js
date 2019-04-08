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
const User_1 = require("../Models/User");
const Board_1 = require("../Models/Board");
const router = express.Router();
const UserModel = new User_1.default().getModelForClass(User_1.default);
const BoardModel = new Board_1.default().getModelForClass(Board_1.default);
// //////////API for testing   , remove later /////////
//show all user,just for test
router.get('/', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel.find({});
        res.send(user);
    }))();
});
// api delete by name, just for test
router.get('/delete/:username', (req, res) => {
    var { username } = req.params;
    (() => __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel.deleteOne({ username: username });
        res.send({ status: MESSAGE.DELETE_USER_OK, user });
    }))();
});
// api delete all user
router.get('/delete-all', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel.remove({});
        res.send({ status: MESSAGE.DELETE_USER_OK, user });
    }))();
});
//////////   end API for test  ////////
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel.findOne({ username });
        if (username === user.username && password === user.password) {
            user['password'] = null;
            res.send({
                status: MESSAGE.LOGIN_OK, user
            });
        }
        else {
            res.send({ status: MESSAGE.USER_INCORRECT });
        }
    }))();
});
router.post('/register', (req, res) => {
    const { username, password, role, imageUrl } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        var existUser = yield UserModel.findOne({ username });
        if (existUser !== null)
            res.send({
                status: MESSAGE.USER_EXIST
            });
        else {
            const u = new UserModel({ username, password, imageUrl });
            var user = yield u.save();
            user['password'] = null; //don't send pass
            res.send({
                status: MESSAGE.REGISTER_OK, user
            });
        }
    }))();
});
router.post('/change-pass', (req, res) => {
    const { username, password, newPassword } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        var existUser = yield UserModel.findOne({ username });
        if (existUser === null || existUser.password != password)
            res.send({
                status: MESSAGE.USER_INCORRECT
            });
        else {
            const user = yield UserModel.update({ username }, { $set: { password: newPassword } });
            res.send({
                status: MESSAGE.CHANGE_PASS_OK, user
            });
        }
    }))();
});
//update info user : role , imageURL
router.post('/edit', (req, res) => {
    const { username, password, imageUrl, role } = req.body;
    var user;
    (() => __awaiter(this, void 0, void 0, function* () {
        user = yield UserModel.findOne({ username });
        if (user === null || user.password != password)
            res.send({ status: MESSAGE.USER_INCORRECT });
        else {
            var obj = {};
            //field which was modified will update, else not update
            if (imageUrl !== null || imageUrl !== undefined)
                obj['imageUrl'] = imageUrl;
            if (role !== null || role !== undefined)
                obj['role'] = role;
            yield UserModel.update({ username }, { $set: obj });
            user = yield UserModel.findOne({ username }, { password: 0 });
            res.send({
                status: MESSAGE.UPDATE_USER_OK, user
            });
        }
    }))();
});
//get all board of user with id=_id
router.get('/:_id/boards', (req, res) => {
    var { _id } = req.params;
    (() => __awaiter(this, void 0, void 0, function* () {
        var boards = yield BoardModel.find({ ownerId: _id }, { name: 1, background: 1 });
        res.send({
            status: MESSAGE.QUERY_OK, boards
        });
    }))();
});
exports.default = router;
