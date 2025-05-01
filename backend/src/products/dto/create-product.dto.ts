import { IsString, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  ratingRate: number;

  @IsNumber()
  @IsNotEmpty()
  ratingCount: number;
}
