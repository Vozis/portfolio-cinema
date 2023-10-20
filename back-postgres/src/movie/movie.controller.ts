import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAll(searchTerm);
  }

  @Get('most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular();
  }

  @Get('by-slug/:slug')
  async getBuSlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug);
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.getById(id);
  }

  @Get('by-actor/:actorId')
  async getByActor(@Param('actorId', ParseIntPipe) actorId: number) {
    return this.movieService.getByActor(actorId);
  }

  @Post('by-genres')
  async getByGenres(@Body('genresIds') genresIds: number[]) {
    return this.movieService.getByGenres(genresIds);
  }

  @Put('update-count-opened')
  async updateCountOpened(@Body('slug') slug: string) {
    return this.movieService.updateCountOpened(slug);
  }

  @Post()
  @Auth('admin')
  async create() {
    return this.movieService.create();
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return await this.movieService.update(id, createMovieDto);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.delete(id);
  }
}
