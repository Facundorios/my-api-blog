import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
