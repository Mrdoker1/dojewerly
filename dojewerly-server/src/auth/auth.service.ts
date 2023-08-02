import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserDocument } from '../users/user.model';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private storageService: StorageService,
    private tokenService: TokenService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }
    console.log('User validation successful, username:', user.username); 
    return user;
  }

  async login(user: UserDocument): Promise<{ token: string }> {
    const payload = { username: user.username, sub: user.id, roles: user.role };
    const token = this.jwtService.sign(payload);
    await this.tokenService.create(token, user.id);
    return { token };
  }

  async logout(token: string): Promise<void> {
    await this.tokenService.delete(token);
    this.storageService.removeItem(this.TOKEN_KEY);
    console.log('User logged out'); // Логирование выхода пользователя
  }

  async validateToken(token: string): Promise<void> {
    const tokenExists = await this.tokenService.exists(token);
    if (!tokenExists) {
      throw new UnauthorizedException('Token is not valid');
    }
  }
}
