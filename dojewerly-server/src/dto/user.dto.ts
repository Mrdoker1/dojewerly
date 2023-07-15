import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john_doe', description: 'Username' })
  username: string;
  @ApiPropertyOptional({ example: 'pa$$w0rd', description: 'Password' })
  password: string;
  @ApiPropertyOptional({
    example: 'user',
    description: 'User role',
    enum: ['admin', 'user'],
  })
  role: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'john_doe', description: 'Username' })
  username: string;

  @ApiPropertyOptional({ example: 'pa$$w0rd', description: 'Password' })
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'pa$$w0rd', description: 'Password' })
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
    enum: ['admin', 'user'],
  })
  role: string;
}
