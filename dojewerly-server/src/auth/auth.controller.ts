import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ example: 'test', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'test', description: 'Password' })
  password: string;
}

class TokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Access token',
  })
  token: string;
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Successful login', type: TokenDto })
  @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<TokenDto> {
    const token = await this.authService.login(req.user);
    return token;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and invalidate JWT token' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
