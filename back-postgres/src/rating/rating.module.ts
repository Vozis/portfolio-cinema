import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaService } from '../prisma.service';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [RatingController],
  providers: [RatingService, PrismaService],
})
export class RatingModule {}
