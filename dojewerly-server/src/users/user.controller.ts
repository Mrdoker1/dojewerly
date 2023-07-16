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
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateProfileDto,
  UpdateUserDto,
} from '../dto/user.dto';
import { UserDocument } from './user.model';
import { UserRole } from '../enum/enums';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Req } from '@nestjs/common';

import { Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
  @ApiOperation({ summary: 'Get all users (only available to admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUsers(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get info about my account (if authorized)' })
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Bearer token',
  // })
  @ApiResponse({ status: 200, description: 'User information' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Добавлено использование JwtAuthGuard
  @Get('me')
  getProfile(@Request() req) {
    const userId = req.user.id; // Извлекаем идентификатор пользователя из токена
    return this.userService.findById(userId); // Используем метод `findById` из `UserService`
  }

  @ApiOperation({
    summary: 'Get all info about user (only available to admin)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findById(id); // Используем метод `findById` из `UserService`
  }

  @ApiOperation({
    summary: 'Get public information about the user, such as favorites lists',
  })
  @Get(':id/public')
  async getUserPublicData(
    @Param('id') id: string,
  ): Promise<Partial<UserDocument>> {
    const user = await this.userService.findById(id);
    // Возвращаем только публичные данные пользователя
    return { username: user.username };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user, new public registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: Object,
  })
  @ApiBadRequestResponse({ description: 'Username is already taken' })
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    // Set the role to "user"
    createUserDto.role = UserRole.USER;

    // Check if the username is already taken
    const existingUser = await this.userService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }
    // Create the user with the provided data
    return this.userService.createUser(createUserDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new user with role selector (only available to admin)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Только администратор может создавать пользователей с выбором роли
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by id (only available to admin)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string, @Req() req: any): Promise<void> {
    const currentUserId = req.user.id;
    await this.userService.deleteUser(id, currentUserId);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update own account information (if authorized)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateOwnAccount(
    @Request() req, // Обновлено: указывается тип `any` для объекта `req`
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    const { username, password } = updateProfileDto;
    if (!username && !password) {
      throw new BadRequestException('No fields to update');
    }
    await this.userService.updateProfile(req.user.id, username, password);
  }

  @Put(':id')
  @ApiOperation({
    summary:
      'Update information about a specific user (only available to admin)',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Обновление информации о пользователе
    await this.userService.updateUser(id, updateUserDto);
  }
}
