import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { PrismaService } from '../prisma.service';
import { Genre, Prisma } from '@prisma/client';
import { ICollection } from './collection.interface';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    const searchOptions: Prisma.GenreWhereInput = searchTerm
      ? {
          OR: [
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
              slug: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    return this.prisma.genre.findMany({
      where: searchOptions,
      include: {
        movies: {
          select: {
            slug: true,
          },
        },
      },
    });
  }

  async getCollections() {
    const genres = await this.prisma.genre.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        movies: {
          select: {
            bigPosters: true,
          },
        },
      },
    });

    const collections = await Promise.all(
      genres.map(async genre => {
        const result: ICollection = {
          _id: String(genre.id),
          slug: genre.slug,
          title: genre.name,
          image: genre.movies[0]?.bigPosters[0]?.url,
        };

        return result;
      }),
    );

    return collections;
  }

  async findByPayload(
    data: keyof Genre,
    value: any,
    selectObject: Prisma.GenreSelect = {},
  ) {
    return this.prisma.genre.findUnique({
      where: { [data]: value },
      // select: {
      //   ...returnUserObject,
      //   favorites: {
      //     select: {
      //       id: true,
      //       name: true,
      //       price: true,
      //       images: true,
      //       slug: true,
      //     },
      //   },
      //   ...selectObject,
      // },
    });
  }

  async getBySlug(slug: string) {
    const genres = await this.prisma.genre.findUnique({
      where: { slug },
    });
    if (!genres) {
      throw new NotFoundException('Genres not found');
    }

    return genres;
  }

  async getById(id: number) {
    const genres = await this.prisma.genre.findUnique({
      where: { id },
    });

    if (!genres) {
      throw new NotFoundException('Genres not found');
    }

    return genres;
  }

  async create() {
    const genre = await this.prisma.genre.create({
      data: {
        slug: '',
        name: '',
        icon: '',
        description: '',
      },
    });

    return genre.id;
  }

  async update(id: number, dto: CreateGenreDto) {
    const oldGenre = await this.prisma.genre.findUnique({
      where: { slug: dto.slug },
    });

    if (oldGenre) throw new BadRequestException('Genre already exists');

    return this.prisma.genre.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
