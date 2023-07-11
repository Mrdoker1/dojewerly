import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { StorageService } from './storage.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET');
        console.log('JWT_SECRET:', secret); // Выводим значение секретного ключа в консоль
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    StorageService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
