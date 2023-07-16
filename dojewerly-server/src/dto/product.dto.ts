import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Bird Earrings', description: 'Name' })
  name: string;

  @ApiProperty({ example: 570, description: 'Price' })
  price: number;

  @ApiProperty({ example: 3, description: 'Stock' })
  stock: number;

  @ApiProperty({
    example: {
      id: 2,
      info: "It is engraved with a wrapped candy",
      description: "Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.",
      part: "arms",
      material: "silver",
      gender: "unisex",
      type: "earring",
    },
    description: 'Props',
  })
  props: {
    id: number;
    info: string;
    description: string;
    part: string;
    material: string;
    gender: string;
    type: string;
  };
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Bird Earrings', description: 'Name' })
  name: string;

  @ApiPropertyOptional({ example: 570, description: 'Price' })
  price: number;

  @ApiPropertyOptional({ example: 3, description: 'Stock' })
  stock: number;

  @ApiPropertyOptional({
    example: {
      id: 2,
      info: "It is engraved with a wrapped candy",
      description: "Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.",
      part: "arms",
      material: "silver",
      gender: "unisex",
      type: "earring",
    },
    description: 'Props',
  })
  props: {
    id: number;
    info: string;
    description: string;
    part: string;
    material: string;
    gender: string;
    type: string;
  };
}
