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
class Board extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ ref: User_1.default, required: true }),
    __metadata("design:type", Object)
], Board.prototype, "ownerId", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: true }),
    __metadata("design:type", Boolean)
], Board.prototype, "modeView", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Board.prototype, "background", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: [] }),
    __metadata("design:type", Array)
], Board.prototype, "members", void 0);
__decorate([
    typegoose_1.prop({ default: [] }),
    __metadata("design:type", Array)
], Board.prototype, "lists", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: Date.now() }),
    __metadata("design:type", Date)
], Board.prototype, "dateCreate", void 0);
exports.default = Board;
