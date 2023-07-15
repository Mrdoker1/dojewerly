import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './user.model';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  // UserService
  async findById(id: string): Promise<UserDocument> {
    console.log('Find user by ID:', id); // Добавьте отладочный вывод
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async deleteUser(id: string, currentUserId: string): Promise<void> {
    if (id === currentUserId) {
      throw new ForbiddenException('You cannot delete yourself.');
    }

    await this.userModel.findByIdAndDelete(id);
  }

  async create(user: Partial<User>): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return user?.role === UserRole.ADMIN;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async updateProfile(
    id: string,
    username: string,
    password: string,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { username, password }).exec();
  }
}
