import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

export interface ProductProps {
  id: number;
  info: string;
  description: string;
  availability: string;
  material: string;
  gender: string;
  type: string;
}

export interface Product extends Document {
  name: string;
  price: number;
  stock: number;
  props: ProductProps;
  imageURLs: string[];
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

  @Prop({ type: [String] })
  imageURLs: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
