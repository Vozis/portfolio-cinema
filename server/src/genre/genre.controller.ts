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
  UseInterceptors,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { HttpCacheInterceptor } from '../common/interceptors/httpCache.interceptor';
import { CacheMovieKeys } from '../movie/constants';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Get()
  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey('GET_ALL_GENRES')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.getAll(searchTerm);
  }

  @Get('collections')
  async getCollections() {
    return this.genreService.getCollections();
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.getById(id);
  }

  @Post()
  @Auth('admin')
  async create() {
    return this.genreService.create();
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createGenreDto: CreateGenreDto,
  ) {
    return this.genreService.update(id, createGenreDto);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.delete(id);
  }
}
