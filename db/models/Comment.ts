import { prop,Ref, Typegoose, ModelType, InstanceType } from 'typegoose';
import User from './User';
import Card from './Card';
export default class Comment extends Typegoose {
    @prop({ required: true })
    content: string;      
  
    @prop({ ref: User, required: true })
    ownerId :Ref<User>;
  
    @prop({ ref: Card, required: true })
    cardId: Ref<Card>;
  
    @prop({ required: true,default:Date.now() })
    dateCreate: Date;
  
    @prop({ required: true })
    fileUrl: string;
  }