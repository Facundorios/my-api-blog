import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  summary?: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
