import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  userId: string;

  // Добавить это поле
  @Prop({ default: Date.now, index: { expires: '1h' } }) // Установить TTL на 1 час
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
