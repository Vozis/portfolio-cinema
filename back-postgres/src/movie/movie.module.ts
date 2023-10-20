import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../prisma.service';

import { ActorModule } from '../actor/actor.module';

@Module({
  imports: [ActorModule],
  controllers: [MovieController],
  providers: [MovieService, PrismaService],
  exports: [MovieService],
})
export class MovieModule {}
