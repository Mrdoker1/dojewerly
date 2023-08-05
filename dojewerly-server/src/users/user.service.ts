import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './user.model';
import {
  CreateUserDto,
  UpdateProfileDto,
  UpdateUserDto,
} from '../dto/user.dto';
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
    const { username } = updateUserDto;
    if (username) {
      const existingUser = await this.findByUsername(username);
      if (existingUser && String(existingUser._id) !== id) {
        throw new BadRequestException('Username is already taken');
      }
    }
    await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async updateProfile(
    id: string,
    username: string,
    password: string,
    settings: { email: boolean },
  ): Promise<UserDocument> {
    if (username) {
      const existingUser = await this.findByUsername(username);
      if (existingUser && String(existingUser._id) !== id) {
        throw new BadRequestException('Username is already taken');
      }
    }
    const user = await this.userModel
      .findByIdAndUpdate(id, { username, password, settings }, { new: true })
      .exec();
    return user; // return the updated document
  }

  async patchProfile(
    id: string,
    updateProfileDto: Partial<UpdateProfileDto>,
  ): Promise<UserDocument> {
    const { username } = updateProfileDto;
    if (username) {
      const existingUser = await this.findByUsername(username);
      if (existingUser && String(existingUser._id) !== id) {
        throw new BadRequestException('Username is already taken');
      }
    }
    const updates = Object.keys(updateProfileDto)
      .filter((key) => updateProfileDto[key] !== undefined)
      .reduce((obj, key) => {
        obj[key] = updateProfileDto[key];
        return obj;
      }, {});
    return this.userModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }
}
