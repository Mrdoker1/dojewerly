import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../users/user.service';
import { Product, ProductDocument } from './product.model';
import {
  CreateProductWithImagesDto,
  UpdateProductDto,
  UpdateProductWithImagesDto,
} from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly userService: UserService,
  ) {}

  async findByPropsId(propsId: number): Promise<ProductDocument[]> {
    return this.productModel.find({ 'props.id': propsId }).exec();
  }

  async findByIds(productIds: string[]): Promise<ProductDocument[]> {
    const products = await this.productModel
      .find({ _id: { $in: productIds } })
      .exec();
    console.log('Products found for IDs:', products);
    return products;
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

  async createProduct(
    createProductDto: CreateProductWithImagesDto,
  ): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async deleteProduct(id: string): Promise<void> {
    // Удалите продукт из избранного всех пользователей
    await this.userService.removeProductFromFavorites(id);
    // Удалите сам продукт
    await this.productModel.findByIdAndDelete(id);
  }

  async updateProduct(
    id: string,
    updateProductDto: Partial<UpdateProductWithImagesDto>,
  ): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
  }

  async updateProductImagesOrder(
    id: string,
    imageURLs: string[],
  ): Promise<void> {
    await this.productModel.findByIdAndUpdate(id, { imageURLs }).exec();
  }

  async partialUpdate(
    id: string,
    partialUpdateProductDto: Partial<UpdateProductDto>,
  ): Promise<Product> {
    await this.productModel
      .findByIdAndUpdate(id, partialUpdateProductDto)
      .exec();
    return this.productModel.findById(id).exec();
  }
}
