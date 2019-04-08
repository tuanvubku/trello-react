import { prop,Ref, Typegoose, ModelType, InstanceType } from 'typegoose';
export default class User extends Typegoose {
    @prop({ unique: true , required: true})
    username: string;
  
    @prop({ required: true })
    password: string;
  
    @prop({ required: true ,default:Date.now()})
    dateCreate: Date;
  
    @prop({ required: true, default: 'user' })
    role: string; //admin |  user
  
    @prop()
    imageUrl?: string; //avatar
  }
