import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { PrismaService } from '../prisma.service';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService,
  ) {}

  async setRating(id: number, dto: CreateRatingDto) {
    const rating = await this.prisma.rating.upsert({
      where: {
        compositeId: {
          movieId: dto.movieId,
          userId: id,
        },
      },
      create: {
        value: dto.value,
        movie: {
          connect: {
            id: dto.movieId,
          },
        },
        user: {
          connect: {
            id: id,
          },
        },
      },
      update: {
        value: dto.value,
      },
      select: {
        value: true,
        movie: {
          select: {
            title: true,
          },
        },
      },
    });

    const averageRating = await this.getAverageRating(id, dto.movieId);

    return {
      userRating: rating,
      averageRating: averageRating,
    };
  }

  // async updateRating(id: number, dto: UpdateRatingDto) {
  //   return this.prisma.rating.update({
  //     where: { id },
  //     data: {
  //       value: dto.value,
  //     },
  //   });
  // }

  async getUserRating(id: number, movieId: number) {
    const rating = await this.prisma.rating.findUnique({
      where: {
        compositeId: {
          userId: id,
          movieId: movieId,
        },
      },
      // select: {
      //   value: true,
      // },
    });
    // .then(data => data.value);

    if (!rating) return;

    return this.prisma.rating
      .findUnique({
        where: {
          compositeId: {
            userId: id,
            movieId: movieId,
          },
        },
        select: {
          value: true,
        },
      })
      .then(data => data.value);
  }

  async getAverageRating(id: number, movieId: number) {
    const { value: rating } = await this.prisma.rating
      .aggregate({
        where: {
          movieId,
        },
        _avg: {
          value: true,
        },
      })
      .then(data => data._avg);

    return this.movieService.updateAverageRating(movieId, rating);
  }

  async deleteRating(id: number) {
    return this.prisma.rating.delete({
      where: { id },
    });
  }
}
