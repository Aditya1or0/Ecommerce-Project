import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
    try {
      return await this.favoriteService.addToFavorites(
        createFavoriteDto.userId,
        createFavoriteDto.productId,
      );
    } catch (error) {
      throw new HttpException(
        'Could not add to favorites',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':productId')
  async removeFavorite(
    @Param('productId') productId: number,
    @Query('userId') userId: number,
  ) {
    try {
      return await this.favoriteService.removeFromFavorites(
        +userId,
        +productId,
      );
    } catch (error) {
      throw new HttpException(
        'Could not remove from favorites',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getFavorites(@Query('userId') userId: number) {
    return this.favoriteService.getFavorites(+userId);
  }

  @Get('is-favorite')
  async isFavorite(
    @Query('userId') userId: number,
    @Query('productId') productId: number,
  ) {
    return this.favoriteService.isFavorite(+userId, +productId);
  }
}
