import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from './user.model';

import { Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users') // Первый добавленный тег будет вкладкой по умолчанию
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): string {
    return 'Get all users';
  }

  @ApiOperation({ summary: 'Get user information' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({ status: 200, description: 'User information' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Добавлено использование JwtAuthGuard
  @Get('me')
  getProfile(@Request() req) {
    const userId = req.user.id; // Извлекаем идентификатор пользователя из токена
    console.log(userId);
    return this.userService.findById(userId); // Используем метод `findById` из `UserService`
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findById(id); // Используем метод `findById` из `UserService`
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
