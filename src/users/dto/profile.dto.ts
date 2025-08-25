import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  last_names: string;

  @IsNotEmpty()
  @IsString()
  first_names: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
