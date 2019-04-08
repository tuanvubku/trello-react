import { prop,Ref, Typegoose, ModelType, InstanceType } from 'typegoose';
import User from './User';
import List from './List';
export default class Card extends Typegoose {
    @prop({ required: true })
    title: string;  
  
    @prop({ ref: User, required: true })
    ownerId :Ref<User>;
  
    @prop({ required: true, default:false })
    archived: boolean; 
  
    @prop({ ref: List, required: true })
    listId: Ref<List>;
  
    @prop({ required: true , default: Date.now()})
    dateCreate: Date;
  
    @prop({ required: true })
    deadline: Date;
  
    @prop({ required: true })
    description: string;
  
    @prop({ required: true })
    label: string;
   
    @prop({ required: true, default:0 })
    order: number;
  
    @prop({required: true, default: [] })
    members :Object[] ; //person who assigned task

    @prop({  default:[] })
    comments: Object[];

    @prop({  default:[] })
    fileUrl: String[];
  }
  