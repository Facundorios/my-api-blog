import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsAlpha,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'My first post' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'my-first-post', required: false })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/my-first-post.jpg',
    required: false,
  })
  coverImage: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This is a summary of my first post',
    required: false,
  })
  summary: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: false, required: false })
  isDraft?: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ example: [1, 2], required: false })
  categoryIds: number[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
