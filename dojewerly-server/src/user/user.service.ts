import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from '../dto/create-user.dto';

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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async create(user: Partial<User>): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
