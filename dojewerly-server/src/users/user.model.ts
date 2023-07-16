import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../enum/enums';

export type UserDocument = User & Document<any, any, User>;

export interface User extends Document {
  username: string;
  password: string;
  role: UserRole;
  favorites: Types.ObjectId[];
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String })
  role: UserRole;

  @Prop({ type: [Types.ObjectId], default: [] })
  favorites: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
