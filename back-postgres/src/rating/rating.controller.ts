import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { RatingService } from './rating.service';

import { Auth } from '../auth/decorators/auth.decorator';
import { User } from '../auth/decorators/user.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';

import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':movieId')
  @Auth()
  async getRating(
    @User('id') id: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.ratingService.getUserRating(id, movieId);
  }

  @Get('average/:movieId')
  @Auth()
  async getAverageRating(
    @User('id') id: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    return this.ratingService.getAverageRating(id, movieId);
  }

  @Post('set-rating')
  @Auth()
  async setRating(@User('id') id: number, @Body() dto: CreateRatingDto) {
    return this.ratingService.setRating(id, dto);
  }

  // @Put(':id')
  // @Auth()
  // async updateRating(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: UpdateRatingDto,
  // ) {
  //   return this.ratingService.updateRating(id, dto);
  // }
}
