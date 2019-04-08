"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const User_1 = require("./User");
const Card_1 = require("./Card");
class Comment extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    typegoose_1.prop({ ref: User_1.default, required: true }),
    __metadata("design:type", Object)
], Comment.prototype, "ownerId", void 0);
__decorate([
    typegoose_1.prop({ ref: Card_1.default, required: true }),
    __metadata("design:type", Object)
], Comment.prototype, "cardId", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Comment.prototype, "dateCreate", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "fileUrl", void 0);
exports.default = Comment;
