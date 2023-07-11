import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.model';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private storageService: StorageService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument): Promise<{ token: string }> {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.storageService.setItem(this.TOKEN_KEY, token);
    return { token };
  }

  async logout(): Promise<void> {
    this.storageService.removeItem(this.TOKEN_KEY);
  }
}
