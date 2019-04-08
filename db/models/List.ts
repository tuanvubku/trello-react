
import { prop,Ref, Typegoose, ModelType, InstanceType } from 'typegoose';
import User from './User';
import Board from './Board';
export default class List extends Typegoose {
    @prop({ required: true })
    name: string;               
  
    @prop({ ref: User, required: true })
    ownerId :Ref<User>;
  
    @prop({ required: true, default: false })
    archived: boolean; 
  
    @prop({ ref: Board, required: true })
    boardId: Ref<Board>;
  
    @prop({ required: true, default:Date.now() })
    dateCreate: Date;

    @prop({  default:[] })
    cards: Object[];
  }