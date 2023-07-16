import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enum/enums';

export type UserDocument = User & Document<any, any, User>;

export interface User extends Document {
  username: string;
  password: string;
  role: UserRole;
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
