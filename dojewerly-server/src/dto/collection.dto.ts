import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({
    example: 'Summer Collection',
    description: 'Name of the collection',
  })
  name: string;

  @ApiProperty({
    example: 'Collection of summer dresses',
    description: 'Description of the collection',
  })
  description: string;
}

export class UpdateCollectionDto {
  @ApiProperty({
    example: 'Summer Collection',
    description: 'Name of the collection',
  })
  name: string;

  @ApiProperty({
    example: 'Collection of summer dresses',
    description: 'Description of the collection',
  })
  description: string;
}
