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
const Comment_1 = require("../Models/Comment");
const router = express.Router();
const CommentModel = new Comment_1.default().getModelForClass(Comment_1.default);
// API for testing
//show all comment,just for test
router.get('/', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const comment = yield CommentModel.find({}); //WHY NOT SHOW REF        
        res.send(comment);
    }))();
});
// api delete all comment
router.get('/delete-all', (req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const comment = yield CommentModel.remove({});
        res.send({ status: MESSAGE.DELETE_COMMENT_OK });
    }))();
});
//end API for test ///////////////////////////////
// api delete by _id
router.post('/delete', (req, res) => {
    var { _id } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const comment = yield CommentModel.deleteOne({ _id });
        res.send({
            status: MESSAGE.DELETE_COMMENT_OK
        });
    }))();
});
router.post('/add', (req, res) => {
    var { content, ownerId, cardId, fileUrl } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        var obj = {};
        if (fileUrl !== null && fileUrl !== undefined)
            obj['fileUrl'] = fileUrl;
        obj['content'] = content;
        obj['ownerId'] = ownerId;
        obj['cardId'] = cardId;
        const c = new CommentModel(obj);
        var comment = yield c.save();
        comment = yield CommentModel.findOne({ _id: comment._id });
        res.send({
            status: MESSAGE.ADD_COMMENT_OK, comment
        });
    }))();
});
//update info comment: content, fileUrl
router.post('/edit', (req, res) => {
    const { _id, content, fileUrl } = req.body;
    var existcomment;
    (() => __awaiter(this, void 0, void 0, function* () {
        existcomment = yield CommentModel.findOne({ _id });
        if (existcomment === null)
            res.send({ status: MESSAGE.NOT_FOUND });
        var obj = {};
        //field which was modified will update, else not update
        if (content !== null && content !== undefined)
            obj['content'] = content;
        if (fileUrl !== null && fileUrl !== undefined)
            obj['fileUrl'] = fileUrl;
        yield CommentModel.update({ _id }, { $set: obj });
        const comment = yield CommentModel.findOne({ _id });
        res.send({
            status: MESSAGE.EDIT_COMMENT_OK, comment
        });
    }))();
});
exports.default = router;
