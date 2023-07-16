import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument, ProductProps } from './product.model';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findByPropsId(propsId: number): Promise<ProductDocument[]> {
    return this.productModel.find({ 'props.id': propsId }).exec();
  }

  async findById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async findAll(params: {
    sort?: string;
    order?: 'asc' | 'desc';
    keyword?: string;
    page?: number;
    limit?: number;
  }): Promise<ProductDocument[]> {
    let query = this.productModel.find();
    // Search by keyword
    if (params.keyword) {
      query = query.find({ name: { $regex: params.keyword, $options: 'i' } });
    }
    // Sorting
    if (params.sort && params.order) {
      query = query.sort({ [params.sort]: params.order === 'asc' ? 1 : -1 });
    }
    // Pagination
    if (params.page && params.limit) {
      query = query.skip((params.page - 1) * params.limit).limit(params.limit);
    }
    return query.exec();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
  }
}
