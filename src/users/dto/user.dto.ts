import { OmitType, PartialType } from '@nestjs/mapped-types';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['profile']),
) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto;
}
