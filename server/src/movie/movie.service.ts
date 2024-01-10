import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { returnActorObject } from '../actor/return-actor.object';
import { MovieSelect, returnMoviesObject } from './return-movies.object';
import { ActorService } from '../actor/actor.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly actorService: ActorService,
  ) {}

  async getAll(searchTerm?: string) {
    const prismaSearchFilter: Prisma.MovieWhereInput = searchTerm
      ? {
          OR: [
            {
              slug: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              title: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    return this.prisma.movie.findMany({
      where: prismaSearchFilter,
      include: {
        posters: {
          select: {
            url: true,
            originalName: true,
          },
        },
        bigPosters: {
          select: {
            url: true,
            originalName: true,
          },
        },
        videos: {
          select: {
            url: true,
            originalName: true,
          },
        },
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
        actors: {
          select: {
            name: true,
          },
        },
        ratings: true,
      },
    });
  }

  async getBySlug(slug: string): Promise<MovieSelect> {
    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      select: returnMoviesObject,
    });

    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  async getById(id: number): Promise<MovieSelect> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      select: returnMoviesObject,
    });

    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  async getByActor(actorId: number): Promise<MovieSelect[]> {
    return this.prisma.movie.findMany({
      where: {
        actors: {
          some: {
            id: actorId,
          },
        },
      },
      select: returnMoviesObject,
    });
  }

  async getByGenres(genresIds: number[]): Promise<MovieSelect[]> {
    const searchOptions = (genreId: number) => {
      return {
        genres: {
          some: {
            id: {
              in: genreId,
            },
          },
        },
      };
    };

    const prismaSearchFilter = {
      AND: genresIds.map(genresId => searchOptions(genresId)),
    };

    return this.prisma.movie.findMany({
      where: prismaSearchFilter,
      select: returnMoviesObject,
    });
  }

  async getMostPopular(): Promise<MovieSelect[]> {
    return this.prisma.movie.findMany({
      where: {
        countOpened: {
          gt: 0,
        },
      },
      orderBy: {
        countOpened: 'desc',
      },
      select: returnMoviesObject,
    });
  }

  async create() {
    const movie = await this.prisma.movie.create({
      data: {
        slug: uuidv4(),
        title: '',
        description: '',
        duration: 0,
        year: 0,
        country: '',
        averageRating: 4,
      },
    });

    return movie.id;
  }

  async update(id: number, dto: CreateMovieDto) {
    const oldMovie = await this.getById(id);

    for (const photo of oldMovie.posters) {
      if (!dto.posters) {
        if (oldMovie.slug === dto.slug) {
          // console.log('ok');
          throw new BadRequestException('Movie already exists');
        }
      } else {
        for (const item of dto.posters) {
          if (item === photo.id && oldMovie.slug === dto.slug) {
            // console.log('ok');
            throw new BadRequestException('Movie already exists');
          }
        }
      }
    }

    // if (dto.slug) {
    //   const oldMovie = await this.prisma.movie.findUnique({
    //     where: { slug: dto.slug },
    //   });
    //
    //   if (oldMovie) throw new BadRequestException('Movie already exists');
    // }

    // for (const photo of oldMovie.bigPosters) {
    //   for (const item of dto.bigPosters) {
    //     if (item === photo.id) {
    //       // console.log('ok');
    //       throw new BadRequestException('Movie already exists');
    //     }
    //   }
    // }

    await this.prisma.movie.update({
      where: { id },
      data: {
        title: dto.title,
        country: dto.country,
        year: dto.year,
        duration: dto.duration,
        description: dto.description,
        slug: dto.slug,
        posters: {
          ...(dto.posters && dto.posters.length
            ? {
                set: [],
                connect: dto.posters.map(id => ({ id })),
              }
            : {}),
        },
        bigPosters: {
          ...(dto.bigPosters && dto.bigPosters.length
            ? {
                set: [],
                connect: dto.bigPosters.map(id => ({ id })),
              }
            : {}),
        },
        videos: {
          ...(dto.videos && dto.videos.length
            ? {
                set: [],
                connect: dto.videos.map(id => ({ id })),
              }
            : {}),
        },
        genres: {
          ...(dto.genres && dto.genres.length
            ? {
                set: [],
                connect: dto.genres.map(id => ({ id })),
              }
            : {}),
        },
        actors: {
          ...(dto.actors && dto.actors.length
            ? {
                set: [],
                connect: dto.actors.map(id => ({ id })),
              }
            : {}),
        },
      },
    });

    await this.actorService.updateCountMovies();

    return this.prisma.movie.findMany({
      select: returnMoviesObject,
    });
  }

  async updateCountOpened(slug: string) {
    return this.prisma.movie.update({
      where: {
        slug,
      },
      data: {
        countOpened: { increment: 1 },
      },
      select: returnMoviesObject,
    });
  }

  async delete(id: number) {
    const movie = await this.getById(id);

    return this.prisma.movie.delete({
      where: { id },
    });
  }

  async updateAverageRating(id: number, value: number) {
    return this.prisma.movie.update({
      where: { id },
      data: {
        averageRating: value,
      },
      select: returnMoviesObject,
    });
  }
}
