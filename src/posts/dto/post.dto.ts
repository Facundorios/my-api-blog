import { PartialType } from '@nestjs/mapped-types';
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
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  @IsNumber()
  userId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds: number[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
