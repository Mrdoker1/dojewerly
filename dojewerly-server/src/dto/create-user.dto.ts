import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'pa$$w0rd', description: 'Password' })
  password: string;
}
