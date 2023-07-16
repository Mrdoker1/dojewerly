import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  NotFoundException,
  Put,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ProductDocument } from './product.model';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../enum/enums';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

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
  @ApiOperation({ summary: 'Create a new product (only available to admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.createProduct(createProductDto);
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
  @ApiOperation({ summary: 'Update product by id (only available to admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productsService.updateProduct(id, updateProductDto);
  }
}
