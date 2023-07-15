import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserDocument } from '../users/user.model';
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
      console.log('User validation successful, username:', user.username); // Логирование успешной проверки пользователя
      return user;
    }
    console.log('User validation failed, username:', user.username); // Логирование неудачной проверки пользователя
    return null;
  }

  async login(user: UserDocument): Promise<{ token: string }> {
    const payload = { username: user.username, sub: user.id, roles: user.role };
    const token = this.jwtService.sign(payload);
    this.storageService.setItem(this.TOKEN_KEY, token);
    return { token };
  }

  async logout(): Promise<void> {
    this.storageService.removeItem(this.TOKEN_KEY);
    console.log('User logged out'); // Логирование выхода пользователя
  }
}
