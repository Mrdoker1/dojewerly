import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document<any, any, Product>;

export interface ProductProps {
  id: number;
  info: string;
  description: string;
  part: string;
  material: string;
  gender: string;
  type: string;
}

export interface Product extends Document {
  name: string;
  price: number;
  stock: number;
  props: ProductProps;
}

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, type: Object })
  props: ProductProps;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
