import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @Type(() => Date) // This tells Nest to convert the string to a Date object
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
