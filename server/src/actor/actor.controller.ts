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
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('update')
  async updateCount() {
    return this.actorService.updateCountMovies();
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.actorService.getAll(searchTerm);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug);
  }

  @Get(':id')
  @Auth('admin')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.getById(id);
  }

  @Post()
  @Auth('admin')
  async create() {
    return this.actorService.create();
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateActorDto,
  ) {
    return this.actorService.update(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.actorService.delete(id);
  }
}
