import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  NotFoundException,
  Put,
  UseGuards,
  Query,
  UploadedFiles,
  InternalServerErrorException,
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import * as fs from 'fs';
import { extname, join } from 'path';
import { UseInterceptors } from '@nestjs/common';
import { ProductsService } from './product.service';
import {
  CreateProductWithImagesDto,
  UpdateProductWithImagesDto,
} from '../dto/product.dto';
import { ProductDocument } from './product.model';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../enum/enums';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

const uploadFolder = './uploads';

// Создайте папку, если она не существует
if (!existsSync(uploadFolder)) {
  mkdirSync(uploadFolder);
}

const storage = diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

@ApiTags('Catalog')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getProducts(
    @Query('sort') sort: string,
    @Query('order') order: 'asc' | 'desc',
    @Query('q') keyword: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ProductDocument[]> {
    return this.productsService.findAll({ sort, order, keyword, page, limit });
  }

  @ApiOperation({ summary: 'Get product by id' })
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductDocument> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productsService.findById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductWithImagesDto })
  @ApiOperation({
    summary: 'Create a new product (only available to the administrator)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images', 20, { storage }))
  async createProduct(
    @UploadedFiles() images,
    @Body() createProductDto: CreateProductWithImagesDto,
  ): Promise<ProductDocument> {
    const imageURLs = images.map((file) => file.filename);

    const productDtoWithImages = { ...createProductDto, imageURLs };
    return this.productsService.createProduct(productDtoWithImages);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by id (only available to admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductWithImagesDto })
  @ApiOperation({
    summary: 'Product update by id (only available to the administrator)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images', 20, { storage }))
  async updateProduct(
    @Param('id') id: string,
    @UploadedFiles() images,
    @Body() updateProductDto: UpdateProductWithImagesDto,
  ): Promise<void> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const imageURLs = images.map((file) => file.filename);

    const productDtoWithImages = { ...updateProductDto, imageURLs };
    await this.productsService.updateProduct(id, productDtoWithImages);
  }

  @Put(':id/images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of product images',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOperation({ summary: 'Adding Images to a Product' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images', 20, { storage }))
  async addImagesToProduct(
    @Param('id') id: string,
    @UploadedFiles() images,
  ): Promise<void> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const imageURLs = images.map((file) => file.filename);

    // Добавляем новые URL-ы изображений к существующим
    const productData = product as unknown as { imageURLs: string[] };
    const updatedProductDto = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      props: product.props,
      imageURLs: [...productData.imageURLs, ...imageURLs],
    };
    await this.productsService.updateProduct(id, updatedProductDto);
  }

  @Delete(':id/images')
  @ApiOperation({ summary: 'Remove product image' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageUrl: {
          type: 'string',
        },
      },
    },
  })
  async deleteProductImage(
    @Param('id') id: string,
    @Body() deleteImageDto: { imageUrl: string },
  ): Promise<void> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Удаляем URL изображения из списка
    const updatedProductDto = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      props: product.props,
      imageURLs: product.imageURLs.filter(
        (url) => url !== deleteImageDto.imageUrl,
      ),
    };
    await this.productsService.updateProduct(id, updatedProductDto);

    // Обработка пути к файлу с использованием функции normalize
    const filePath = join(uploadFolder, deleteImageDto.imageUrl);
    console.log(filePath);

    // Удаляем файл изображения с сервера
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error(`Error while deleting file: ${err.message}`);
      throw new InternalServerErrorException('Error when deleting a file');
    }
  }

  @Get(':id/images')
  @ApiOperation({ summary: 'Get all product images' })
  async getProductImages(@Param('id') id: string): Promise<string[]> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product.imageURLs;
  }
}
