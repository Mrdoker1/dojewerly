import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'Get all users';
  }

  @Get(':id')
  getUserById(): string {
    return 'Get user by ID';
  }

  @Post()
  createUser(): string {
    return 'Create user';
  }
}
